<template>
  <div></div>
</template>

<script>
import { getSysUserRole, getsysRole, getSysUser } from "@/api/user";
export default {
  name: "role",
  created() {
    getSysUserRole();
    getsysRole();
    getSysUser();
  }
};
</script>
