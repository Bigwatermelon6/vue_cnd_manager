<template>
  <div class="avatar" >
    <div v-if="isLogin" class="isLogin">
      <el-dropdown @command="exitLogin">
          <span class="el-dropdown-link">
            <img src="../../assets/images/logo.png" width="50px" height="50px" alt="">
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item >退出登錄</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div v-else class="notLogin"  @click="showLoginBox">
      <el-tooltip class="item" effect="dark" content="Click to Login" placement="bottom">
        <i class="el-icon-user-solid"></i>
      </el-tooltip>
    </div>
</div>

</template>

<script>
import {getToken, removeToken} from '@/utils/auth'
import {mapState, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  // 挂载的时候就去得到token
  mounted () {
    this.getUserToken()
  },
  methods: {
    // 退出登录清理vuex和cookie
    exitLogin () {
      // console.log(1111)
      removeToken()
      this.setLogin(false)
    },
    // 得到user的token
    getUserToken () {
      if (getToken() && JSON.parse(getToken())['token']) {
        this.setLogin(true)
      }
    },
    // 显示登录的窗口
    showLoginBox () {
      this.$emit('showBox')
    },
    // mapMutations需要在methods中展开
    ...mapMutations({
      setLogin: 'SET_LOGIN'
    })
  }

}
</script>

<style lang="scss" scoped>
.avatar {
  position: absolute;
  height: 50px;
  right:40px;
  top: 0;
  width: 50px;
  .isLogin {
    height: 50px;
    width: 50px;
    cursor: pointer;
  }
  .notLogin{
    height: 100%;
    line-height: 50px;
    font-size: 30px;
    text-align: center;
    cursor: pointer;
    & > span {
      display: block;
      height: 50px;
      width: 50px;
      border-right: 1px solid #eee;
    }
  }

}
</style>
