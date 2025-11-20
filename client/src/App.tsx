import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import {
  ProjectsManager,
  ExperiencesManager,
  SkillsManager,
  CertificationsManager,
  EducationManager,
  BlogsManager,
  CompaniesManager,
  ChannelsManager,
  ReferralsManager,
  SocialLinksManager,
  HireOptionsManager,
} from "./pages/admin/AllManagers";
import {
  HeroSectionEditor,
  AboutSectionEditor,
  SiteSettingsEditor,
} from "./pages/admin/SectionEditors";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      {/* Admin Routes */}
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/projects"} component={ProjectsManager} />
      <Route path={"/admin/experiences"} component={ExperiencesManager} />
      <Route path={"/admin/skills"} component={SkillsManager} />
      <Route path={"/admin/certifications"} component={CertificationsManager} />
      <Route path={"/admin/education"} component={EducationManager} />
      <Route path={"/admin/blogs"} component={BlogsManager} />
      <Route path={"/admin/companies"} component={CompaniesManager} />
      <Route path={"/admin/channels"} component={ChannelsManager} />
      <Route path={"/admin/referrals"} component={ReferralsManager} />
      <Route path={"/admin/social-links"} component={SocialLinksManager} />
      <Route path={"/admin/hire-options"} component={HireOptionsManager} />
      <Route path={"/admin/hero"} component={HeroSectionEditor} />
      <Route path={"/admin/about"} component={AboutSectionEditor} />
      <Route path={"/admin/settings"} component={SiteSettingsEditor} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
