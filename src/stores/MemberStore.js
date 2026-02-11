import { defineStore } from "pinia";
import { ref } from "vue";

export const memberStore = defineStore("member", () => {
  const loginMemberId = ref(null);
  const setLoginMemberId = (memberId) => {
    loginMemberId.value = memberId;
  }

  const loginMember = ref({});
  const setLoginMember = (user) => {
    loginMember.value = user;
  }

  const members = ref([])
  const setMembers = (memberList) => {
    members.value = memberList;
  }

  const selectedMember = ref(null);
  const setSelectedMember = (member) => {
    selectedMember.value = member;
  }

  return {
    loginMemberId,
    setLoginMemberId,
    loginMember,
    setLoginMember,
    members,
    setMembers,
    selectedMember,
    setSelectedMember
  }
})