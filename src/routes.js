import HelloWorld from "./components/HelloWorld.vue";
import FamilyTree from "./components/FamilyTree.vue";

const routes = [
    { path: '/', component: HelloWorld, name: 'home' },
    { path: '/family-tree', component: FamilyTree, name: 'familyTree' },
];

export default routes;