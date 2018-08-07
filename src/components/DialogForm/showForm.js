import Vue from 'vue'
import Component from '@/components/DialogForm/DialogForm'

const DialogFormConstructor = Vue.extend(Component)

function showForm (opts) {
  if (Vue.prototype.$isServer) {
    return
  }

  const instance = new DialogFormConstructor({
    propsData: opts
  })
  // 编译DOM并添加到body
  instance.$mount()
  document.body.appendChild(instance.$el)
  // 打开弹窗
  instance.visible = true
  // 监听弹窗已关闭的事件释放资源
  instance.$on('closed', _ => {
    instance.$destroy()
    document.body.removeChild(instance.$el)
  })
  return instance
}

export default showForm
