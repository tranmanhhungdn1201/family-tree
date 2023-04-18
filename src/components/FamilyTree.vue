<template>
  <div id="tree" ref="tree"></div>
</template>

<script>

import OrgChart from '@balkangraph/orgchart.js'
import BaseService from "../service.js";

export default {

  name: 'tree',
  data() {
    return {
      nodes: [
        {}
      ]
    }
  },
  methods: {
    initTree: function(domEl, nodes) {
      OrgChart.templates.ana.field_0 =
          '<text class="field_0" data-width="185" style="font-size: 25px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      OrgChart.templates.ana.field_1 =
          '<text class="field_1" data-width="185" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      OrgChart.templates.ana.field_2 =
          '<text class="field_2" data-width="185" style="font-size: 13px;" fill="#e7e22c" x="30" y="100" text-anchor="middle">{val}</text>';
      OrgChart.SEARCH_PLACEHOLDER = 'Tìm kiếm'
      OrgChart.SEARCH_CLOSE_RESULT_ON_ESCAPE_OR_CLICKOUTSIDE = true;
      this.chart = new OrgChart (domEl, {
        nodes,
        ...this.getConfigChart()
      });
    },
    getConfigChart: function () {
      const editMode = BaseService.getModeEdit();
      let nodeMenu = null;
      let buttons = null;
      if (editMode) {
        nodeMenu = {
          details: { text: "Thông tin" },
          add: { text: "Thêm mới" },
          remove: { text: "Xóa" },
          edit: { text: "Sửa"}
        }
        buttons = {
          edit: {
            icon: OrgChart.icon.edit(24,24,'#fff'),
                text: 'Sửa',
                hideIfEditMode: true,
                hideIfDetailsMode: false,
          },
          share: null,
              pdf: null,
              remove: {
            icon: OrgChart.icon.remove(24,24,'#fff'),
                text: 'Xóa',
                hideIfDetailsMode: true
          },
        }
      }
      return {
        collapse: {
          level: 2,
          allChildren: true,
        },
        nodeBinding: {
          field_0: "name",
          field_1: "description",
          field_2: "level"
        },
        nodeMenu,
        editForm: {
          addMore: null,
          cancelBtn: "Hủy",
          saveAndCloseBtn: 'Lưu và đóng',
          generateElementsFromFields: false,
          buttons,
          elements: [
            { type: 'textbox', label: 'Họ và tên', binding: 'name' },
            { type: 'date', label: 'Ngày sinh', binding: 'dob' },
            { type: 'checkbox', label: 'sống', binding: 'isDie'},
            [
              { type: 'textbox', label: 'Điện thoai', binding: 'phone' },
              { type: 'textbox', label: 'Địa chi', binding: 'address'},
            ],
            { type: 'textbox', label: 'Mô tả', binding: 'description'},
          ]
        }
      }
    },
    callApiMembers: function () {
      return fetch('http://localhost:3000/members')
          .then(response => {
            return response.json();
          })
    },
    transformData: function (data) {
      data.map(member => {
        //remove key
        const hideFields = ['dateDie'];
        this.removeFieldObject(member, hideFields)
        return member;
      })
      return data;
    },
    removeFieldObject(member, arrKey) {
      for (let key of arrKey) {
        delete member[key];
      }
    },
    updateNode: function (data) {
      return fetch('http://localhost:3000/members/' + data.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => {
        return response.json();
      })
    },
    addNewNode: function (data) {
      return fetch('http://localhost:3000/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => {
        return response.json();
      })
    },
    removeNode: function (id) {
      return fetch('http://localhost:3000/members/' + id, {
        method: 'DELETE',
      }).then(response => {
        return response.json();
      })
    },
  },
  async mounted () {
    let data = await this.callApiMembers()
    this.nodes = this.transformData(data)
    this.initTree(this.$refs.tree, this.nodes)
    const tempChart = this.chart;

    this.chart.on('field', function(sender, args) {
      if (args.name == 'level') {
        let level = tempChart.getNode(args.data.id)?.level;
        args.value = level ? `(Đời: ${level})` : '';
      }
    });
    this.chart.on('searchclick', function (sender, nodeId) {
      document.querySelector('.boc-search .boc-link-boc-button').click();
      while(tempChart.getScale() < 1) {
        tempChart.zoom(true);
      }
      while(tempChart.getScale() > 1) {
        tempChart.zoom(false);
      }

      tempChart.center(nodeId, null, function(){
        document.querySelector(`[data-n-id="${nodeId}"]`).classList.add('highlight');
      });
    });
    this.chart.on('expcollclick', function (sender, collapse, id, ids) {
      console.log('expcollclick', collapse)
      if (!collapse) {
        sender.center(id, {
          parentState: OrgChart.COLLAPSE_PARENT_NEIGHBORS,
          childrenState: OrgChart.COLLAPSE_SUB_CHILDRENS,
          rippleId: id
        });
        return false;
      }
    });
    this.chart.onUpdateNode(async (args) => {
      await this.updateNode(args['newData']);
    });
    this.chart.onAddNode(async (args) => {
      args['data']['id']= ++this.nodes.slice(-1)[0].id;
      await this.addNewNode(args['data']);
      const data = await this.callApiMembers()
      this.chart.load(data)
    });
    this.chart.onRemoveNode(async (args) => {
      await this.removeNode(args.id);
    });
  }
}
</script>

<style>
.boc-edit-form .boc-edit-form-fields {
  flex-grow: 0 !important;
}
#tree {
  margin-top: 72px;
  width: 100%;
  height: 100%;
  background-image: url('http://4.bp.blogspot.com/-J_sg6Pyug94/ULxnyFlF_zI/AAAAAAAAP2o/-aqOcdJt58w/s1600/nengiaphavang.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

[data-l-id] path {
  stroke-width: 6 !important;
}
[data-n-id] rect {
  fill: #85711f;
}
.highlight rect {
  fill: #db4d4d;
}
</style>