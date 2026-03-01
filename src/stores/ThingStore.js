import { thingApi } from "@/apis/ThingApi";
import { defineStore } from "pinia";
import { ref } from "vue";
import { memberStore } from "./MemberStore";
import { useRouter } from "vue-router";

export const thingStore = defineStore("thing", () => {
  const localStorage = window.localStorage;
  const thingApiStore = thingApi();
  const memberDataStore = memberStore();
  const router = useRouter();
  
  const things = ref([])
  const setThings = (thingList) => {
    things.value = thingList;
  }
  const selectedThing = ref(null);
  const modalType = ref(null);

  const clearPage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    things.value = [];
    selectedThing.value = null;
    modalType.value = null;
    router.push('/');
  }

  const resetThings = async () => {
    const response = await thingApiStore.getThings(memberDataStore.loginMemberId);
    if (response) {
      let things = [];
      response.map(thing => {
        return {
          id: thing.thingId,
          name: thing.name ? thing.name : "-",
          price: thing.price ? thing.price : "-",
          description: thing.description ? thing.description : "-",
          type: thing.type ? thing.type : "-",
          createdAt: thing.createdAt ? thing.createdAt : "-",
          ownerName: thing.memberName ? thing.memberName : "-"
        }
      }).forEach(thing => things.push(thing));
      setThings(things);
    } else clearPage();
  }

  

  /* ===== 모달 제어 ===== */

  const openDetail = async (thing) => {
    const response = await thingApiStore.getThingById(thing.id, memberDataStore.loginMemberId);
    if (response) {
      selectedThing.value = {
        id: response.thingId,
        name: response.name ? response.name : "-",
        price: response.price ? response.price : "-",
        description: response.description ? response.description : "-",
        type: response.type ? response.type : "-",
        createdAt: response.createdAt ? response.createdAt : "-",
        memberId: response.memberId ? response.memberId : "-",
        memberName: response.memberName ? response.memberName : "-",
        isOwn: response.isOwn
      }
      modalType.value = 'detail';
    } else clearPage();
  }

  const openCreate = () => {
    selectedThing.value = null
    modalType.value = 'create'
  }

  const openEdit = () => {
    modalType.value = 'edit'
  }

  const closeModal = () => {
    resetThings();
    selectedThing.value = null
    modalType.value = null
  }

  /* ===== CRUD ===== */

  const saveProduct = async (data) => {
    if (modalType.value === 'edit') {
      if (!confirm("물건을 수정하겠습니까?")) return;
      const response = await thingApiStore.updateThing({
        thingId: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        type: data.type,
        memberId: data.memberId
      });
      if (response && response.apiResult) {
        alert("물건 수정이 완료되었습니다!");
        closeModal();
      } else {
        alert("세션이 만료되서 초기 페이지로 돌아갑니다");
        clearPage();
      }
    } else {
      if (!confirm("물건을 등록하겠습니까?")) return;
      const response = await thingApiStore.createThing({
        name: data.name,
        description: data.description,
        price: data.price,
        type: data.type,
        memberId: memberDataStore.loginMemberId
      });
      if (response && response.apiResult) {
        alert("물건 등록이 완료되었습니다!");
        closeModal();
      } else {
        alert("세션이 만료되서 초기 페이지로 돌아갑니다");
        clearPage();
      }
    }
  }

  const deleteProduct = async () => {
    if (!confirm("해당 물건을 삭제하겠습니까?")) return;   
    const response = await thingApiStore.deleteThing(selectedThing.value.id);
    if (response && response.apiResult) {
      alert("물건 삭제가 완료되었습니다!");
      closeModal();
    } else {
      alert("세션이 만료되서 초기 페이지로 돌아갑니다");
      clearPage();
    }
  }

  return {
    things,
    resetThings,
    setThings,
    selectedThing,
    modalType,
    openDetail,
    openCreate,
    openEdit,
    saveProduct,
    deleteProduct,
    closeModal
  }
});