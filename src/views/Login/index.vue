<template >
 <div id="login">
  <div class="login-wrap">
   <ul class="menu-tab">
    <li v-for="item in mentTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
   </ul>
   <!--表单开始-->
   <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
    <el-form-item prop="username" class="item-form">
     <label>用户名</label>
     <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  prop="password"  class="item-form">
    <label>密码</label>
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="9"></el-input>
   </el-form-item>
    <el-form-item  prop="passwords"  class="item-form" v-if="model==='register'">
     <label>重复密码</label>
     <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="9"></el-input>
    </el-form-item>
    <el-form-item  prop="code"  class="item-form">
     <label>验证码</label>
     <el-row :gutter="20">
      <el-col :span="24">
       <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
      <el-col :span="6">
      <el-button type="success" class="center">获取验证码</el-button></el-col>
     </el-col>
     </el-row>
    </el-form-item>
    <el-form-item>
     <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
     <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
   </el-form>
  </div>
 </div>
</template>
<script>
 import {stripscript} from '@/utils/validate.js'
    export default {
        name: "login",
        data(){
            // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('年龄不能为空'));
            //     }
            //     setTimeout(() => {
            //         if (!Number.isInteger(value)) {
            //             callback(new Error('请输入数字值'));
            //         } else {
            //             if (value < 18) {
            //                 callback(new Error('必须年满18岁'));
            //             } else {
            //                 callback();
            //             }
            //         }
            //     }, 1000);
            // };
            //验证用户名
            var validateUsername = (rule, value, callback) => {
                    this.ruleForm.username=stripscript(value) //把过滤后的值绑定过去
                value=this.ruleForm.username
                let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(!reg.test(value)){
                    callback(new Error('用户名格式有误'));
                }else {
                    callback();//true

                }
            };
            //验证密码
            var validatePassword = (rule, value, callback) => {
                this.ruleForm.password=stripscript(value)
                value=this.ruleForm.password
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            //验证验证码
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            var validatePasswords=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value!=this.ruleForm.password){
                    callback(new Error('密码输入不一致'));
                }else {
                   callback()
                }
            };
            return{
                mentTab:[
                    {txt:'登录',current:true,type:'login'},
                    {txt:'注册',current:false,type:'register'}
                ],
                //模块值
                model:'login',
                ruleForm: {
                    username: '',
                    password: '',
                    code: '',
                    passwords:''
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
                    ],
                    passwords:[
                        {validator:validatePasswords,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            toggleMenu(data){
                console.log(data)
                this.mentTab.forEach(item=>{
                    item.current =false
                });
                data.current=true
                this.model=data.type
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
#login{
    /*vh是基于可视区的单位*/
    height: 100vh;
 background-color:paleturquoise ;
}
.login-wrap{
 width: 330px;
 margin: auto;
}
 .menu-tab{
  text-align: center;
  li{
   display: inline-block;
   width: 88px;
   line-height: 36px;
   font-size: 14px;
   color: #fff;
   border-radius: 2px;
  }
  .current{
        background-color: green;
  }
 }
.login-form{
 label{
  display: block;
  font-size: 14px;
  color: blue;
  text-align: left;
 }
}
 .item-form{
  margin-bottom: 13px;
 }
 .block{
  display: block;
  width: 100%;
 }
 .center{
  display: block;
  text-align: center;
  margin-left: 80px;
 }
</style>