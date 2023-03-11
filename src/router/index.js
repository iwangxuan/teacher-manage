/*
 * @Date: 2023-01-31 16:11:18
 * @LastEditTime: 2023-03-05 23:14:35
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "/info",
          name: "infoManage",
          component: () => import("../views/InfoManage/InfoManage.vue"),
        },
        {
          path: "/account",
          name: "accountManage",
          component: () => import("../views/AccountManage.vue"),
        },
        {
          path: "/password",
          name: "passwordChange",
          component: () => import("../views/InfoManage/PasswordChange.vue"),
        },
        {
          path: "/classes",
          name: "classesManage",
          component: () => import("../views/ClassManage/ClassesManage.vue"),
          children: [
            {
              path: "/classes/dormitory",
              name: "classDormitory",
              component: () =>
                import("../views/ClassManage/ClassDormitory.vue"),
            },
            {
              path: "/classes/meeting",
              name: "classMeeting",
              component: () => import("../views/ClassManage/ClassMeeting.vue"),
            },
            {
              path: "/classes/listening",
              name: "classesListening",
              component: () =>
                import("../views/ClassManage/ClassListening.vue"),
            },
            {
              path: "/class/interview",
              name: "classInterview",
              component: () =>
                import("../views/ClassManage/ClassInterview.vue"),
            },
          ],
        },
        {
          path: "/classes/:classId",
          name: "classView",
          component: () => import("../views/ClassManage/ClassView.vue"),
        },
        {
          path: "/students/basic",
          name: "basicMessage",
          component: () => import("../views/studentManage/BasicMessage.vue"),
        },
        {
          path: "/students/destitute",
          name: "destituteMessage",
          component: () =>
            import("../views/studentManage/DestituteMessage.vue"),
        },
        {
          path: "/students/infraction",
          name: "infractionMessage",
          component: () =>
            import("../views/studentManage/InfractionMessage.vue"),
        },
        {
          path: "/students/prizewinner",
          name: "prizewinnerMessage",
          component: () =>
            import("../views/studentManage/PrizewinnerMessage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
