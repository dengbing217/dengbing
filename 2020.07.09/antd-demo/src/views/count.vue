<template>
<div class="test">
    <h1>审计管理</h1>
    <button @click="getlist">点击</button>
    </div>
</template>

<script>
import  '../mock/mock.js';
import axios from 'axios';
export default{
    name:"test",
    data(){
        return{
        }
    },
    mounted (){
        this.getlist()
    },
    methods:{
        getlist(){
            axios.post('test123.com').then((res) => {//这里post和get都行
                console.log(res)
                //输出结果：{ "name": "李秀英", "age": 7 } 
                //结果是随机的，也有可能是其他值
            })
            axios.post('myname.com').then((res) => {//这里必须是post请求，因为上边定义了type类型是post
                console.log(res)
               //输出结果：{ "data": [ { "title": "Lfw Pbljsjgcu Zsiyvzc Tahgecies", "article": "铁十入易团江无体之车和基出们应车。" } ] }；
               // 结果是随机的，也有可能是其他值
            })
        },
    }
}
</script>