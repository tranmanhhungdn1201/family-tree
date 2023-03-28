<template>
  <div class="container pt-5">
    <p>
      <a class="btn-primary" @click="collapseEdit">
        Chỉnh sửa
      </a>
    </p>
    <div v-show="editMode && showEdit">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
      <button class="btn btn-success m-3" @click="saveData">Lưu</button>
      <hr/>
    </div>
    <div v-html="editorData" class="mb-5"></div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseService from "../service.js";
export default {
  data () {
    const editMode = BaseService.getModeEdit()
    const showEdit = false;
    return {
      showEdit,
      editMode,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      }
    };
  },
  methods: {
    collapseEdit() {
      console.log('show')
      this.showEdit = !this.showEdit
    },
    async fetchData() {
      const res = await fetch(`http://localhost:3000/data`)
          .then(response => {
            return response.json();
          })
      this.editorData = res.intro;
    },
    saveData() {
      const dataUpdate = {
        "intro": this.editorData
      };
      console.log(JSON.stringify(dataUpdate));
      const res = fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUpdate),
      }).then(response => {
        return response.json();
      })
    },
  },
  created() {
    this.fetchData();
  },
}
</script>
