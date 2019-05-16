import Vue from 'vue'
import vuex from 'vuex'
//引入一个新的js文件
Vue.use(vuex);
//保存本地插件
import VuePersist from 'vuex-persist'
const vuexLocal=new VuePersist({
    storage:window.localStorage
})


var arr=[];           
if(localStorage.getItem('clause')){
    arr=JSON.parse(localStorage.getItem('clause'))
}

export default new vuex.Store({
    //保存本地插件
    // plugins:[vuexLocal.plugin],
    state:{//储存变量 声明数据
        nam:'',
    //    n:0
    },
    //mutations 声明改变数据的方法
    mutations:{//必须同步操作
      
    },
    getters:{//相当于state里面的数据的计算属性
        reversName(state){
            //return state.name.split('').reverse().join('');
        }
    },
    modules:{
        //定义新的js文件
    },
    actions:{//可以一步操作数据
        myAsync(state){
            //执行异步操作
            state.commit('async')
        }
    }
   
})
