import {defineStore} from "pinia";
export const useTagsViewsStore = defineStore({
    id: "tagsViewsState",
    state: ()=> ({
        activeTabsValue:"",
        visitedViews:[{path:"/home",name:"Home",meta:{title:"首页",affix:true},title:"首页"}],
    }),
    getters: {},
    actions: {
        setTabsMenuValue(val:string){
            this.activeTabsValue=val
        },
        addVisitedView(view){
            this.setTabsMenuValue(view.path)
            if(this.visitedViews.some(v=>v.path===view.path))return
            this.visitedViews.push(Object.assign({},view,{
                title: view.meta.title || 'no-name'
            }))
        },
        addView(view:any){
            this.addVisitedView(view)
        },
    }
})