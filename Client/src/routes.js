
// Layout Types
import DefaultLayout from "./layouts/Default";
import CustomLayout from "./layouts/Custom";

// Route Views
import dashboard from "./views/Dashboard";
import UserProfile from "./views/UserProfile";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import ScheduleInterview from "./views/ScheduleInterview";
import CandidateRegistration from "./views/CandidateRegistration";
import LiveInterviews from "./views/LiveInterviews";
import PastInterviews from "./views/PastInterviews";
import Interview from './views/Interview';
import Home from './views/Home';
import GraphicalOverview from "./views/GraphicalOverview";

export default [
  {
    path: "/",
    exact: true,
    layout: CustomLayout,
    component: Home
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: dashboard
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/schedule-Interview",
    layout: DefaultLayout,
    component: ScheduleInterview
  },
  {
    path: "/live-Interviews",
    exact: true,
    layout: DefaultLayout,
    component: LiveInterviews
  },
  {
    path: "/past-Interviews",
    exact: true,
    layout: DefaultLayout,
    component: PastInterviews
  },
  {
    path: "/candidate-registration",
    layout: CustomLayout,
    component: CandidateRegistration
  },
  {
    path: "/interview",
    layout: DefaultLayout,
    component: Interview
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/graphical-overview",
    layout: DefaultLayout,
    component: GraphicalOverview
  },
];
