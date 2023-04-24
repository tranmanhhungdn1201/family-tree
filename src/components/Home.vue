<template>
  <div class="main">
    <div class="container pt-5 mt-5 pb-5">
      <p>
        <a class="btn-primary" @click="collapseEdit">
          Chỉnh sửa
        </a>
      </p>
      <div v-show="editMode && showEdit">
        <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
        ></ckeditor>
        <button class="btn btn-success m-3" @click="saveData">Lưu</button>
        <hr />
      </div>
      <div v-html="editorData" class="mb-5"></div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseService from '../service.js';
import {getData, updateData} from "../firebase.service.js";
export default {
  data() {
    const editMode = BaseService.getModeEdit();
    const showEdit = false;
    return {
      showEdit,
      editMode,
      editor: ClassicEditor,
      originData: null,
      editorData: '',
      editorConfig: {
      },
    };
  },
  methods: {
    collapseEdit() {
      this.showEdit = !this.showEdit;
    },
    async fetchData() {
      const res = await getData(`data`);
      // const res = await fetch(
      //     `http://localhost:3000/data`
      // ).then((response) => {
      //   return response.json();
      // });
      this.originData = res
      this.editorData = res.intro;
    },
    saveData() {
      const dataUpdate = {
        ...this.originData
      };
      dataUpdate.intro = this.editorData
      updateData(`data`, dataUpdate)
      // const res = fetch('http://localhost:3000/data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dataUpdate),
      // }).then((response) => {
      //   return response.json();
      // });
    },
  },
  created() {
    getData();
    this.fetchData();
  },
};
</script>

<style scoped>
.main {
  height: 100%;
  overflow-y: auto;
}
</style>
