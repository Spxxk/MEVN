import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventDetailView from "../views/EventDetailView.vue";
import CreateEvent from "@/views/CreateEvent.vue";
import LeagueView from "../views/LeagueView.vue";
import LeagueDetailView from "../views/LeagueDetailView.vue";
import CreateLeague from "@/views/CreateLeague.vue";
import EditEvent from "@/views/EditEvent.vue";
import NotificationView from "@/views/NotificationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/event/:game",
    name: "event",
    component: EventDetailView,
  },
  {
    path: "/league/",
    name: "league",
    component: LeagueView,
  },
  {
    path: "/league_detail/:league",
    name: "league_detail",
    component: LeagueDetailView,
  },
  {
    path: "/create_event",
    name: "create_event",
    component: CreateEvent,
  },
  {
    path: "/edit_event/:game",
    name: "edit_event",
    component: EditEvent,
  },
  {
    path: "/create_league",
    name: "create_league",
    component: CreateLeague,
  },
  {
    path: "/notification/:game",
    name: "notification_view",
    component: NotificationView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
