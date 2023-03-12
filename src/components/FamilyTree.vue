<template>
  <div id="tree" ref="tree"></div>
</template>

<script>

import OrgChart from '@balkangraph/orgchart.js'
import _ from 'lodash';

export default {

  name: 'tree',
  data() {
    console.log('data');
    return {
      nodes: [
        {}
      ]
    }
  },
  methods: {
    initTree: function(domEl, nodes) {
      console.log('init tree', this.nodes)
      OrgChart.templates.ana.field_0 =
          '<text class="field_0" style="font-size: 25px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      OrgChart.templates.ana.field_1 =
          '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';

      this.chart = new OrgChart (domEl, {
        nodes,
        ...this.getConfigChart()
      });
    },
    getConfigChart: function () {
      return {
        nodeBinding: {
          field_0: "name",
          field_1: "description",
          field_2: "level"
        },
        linkBinding: {
          link_field_0: "level"
        },
        nodeMenu: {
          details: { text: "Thông tin" },
          add: { text: "Thêm mới" },
          remove: { text: "Xóa" },
          edit: { text: "Sửa"}
        },
        editForm: {
          addMore: null,
          cancelBtn: "Hủy",
          saveAndCloseBtn: 'Lưu và đóng',
          generateElementsFromFields: true,
          buttons:  {
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
          },
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
      console.log(data)
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
    saveNode: function (data) {
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
    removeNode: function (id) {
      return fetch('http://localhost:3000/members/' + id, {
        method: 'DELETE',
      }).then(response => {
        return response.json();
      })
    }
  },
  async mounted () {
    console.log('moun')
    let data = await this.callApiMembers()
    this.nodes = this.transformData(data)
    this.initTree(this.$refs.tree, this.nodes)
    const tempChart = this.chart;
    this.chart.on('field', function(sender, args){
      if (args.name == 'level'){
        console.log(tempChart.getNode(args.data.id))
        args.value = "Đời: " + tempChart.getNode(args.data.id)?.level;
      }
    });
    this.chart.onUpdateNode(async (args) => {
      const rs = await this.saveNode(args['newData']);
      if (rs.id && args['newData']?.id === rs?.id) {
        return true
      }
      alert('Lỗi')
      return false
    });
    this.chart.onRemoveNode(async (args) => {
      console.log(args.id)
      //const rs = await this.removeNode(args.id);
      return false;
    });
  }
}
</script>

<style>
.boc-edit-form .boc-edit-form-fields {
  flex-grow: 0 !important;
}

</style>