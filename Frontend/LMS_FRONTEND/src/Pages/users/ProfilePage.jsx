import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Mail,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  CalendarDays,
  User,
  Hash,
  LayoutDashboard,
  PlusCircle,
  Settings,
  LogOut,
  Pencil,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { useGetAllPurchaseCourse } from "@/Hooks/course.hook";
import { useUserStore } from "@/Store/user.store";
import { useLoggedOut } from "@/Hooks/User.hook";
import { Button } from "@/components/ui/button";
import { Card , CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getInitials = (fullName = "") => {
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const formatJoinedDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};



const formatShortDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

// A deterministic accent gradient per placeholder course card, derived from the course id
const THUMBNAIL_GRADIENTS = [
  "from-indigo-500 to-violet-600",
  "from-sky-500 to-cyan-500",
  "from-fuchsia-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-blue-600 to-indigo-700",
];

const getGradientForId = (id = "") => {
  const sum = String(id)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return THUMBNAIL_GRADIENTS[sum % THUMBNAIL_GRADIENTS.length];
};

// ---------- Page ----------

export default function Profile() {
  const { user } = useUserStore();
  const { data: purchaseData } = useGetAllPurchaseCourse();
  const { mutate: logout, isPending: isLoggingOut } = useLoggedOut();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const {
    _id,
    fullName,
    email,
    admin,
    purchaseCourse = [],
    createdAt,
  } = user;

  const purchasedCourses = purchaseData?.purchaseCourse || [];
  const hasCourses = purchasedCourses.length > 0;

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------------- Hero Section ---------------- */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-8 shadow-lg shadow-indigo-200/50 sm:p-10">
          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-3xl font-semibold text-white ring-4 ring-white/20 backdrop-blur-sm sm:h-28 sm:w-28 sm:text-4xl">
              {getInitials(fullName)}
            </div>

            <div className="flex-1">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {fullName}
                </h1>
                <Badge
                  className={`w-fit border-0 px-3 py-1 text-xs font-medium ${
                    admin
                      ? "bg-amber-400 text-amber-950 hover:bg-amber-400"
                      : "bg-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  {admin ? "Admin" : "Student"}
                </Badge>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2 text-indigo-100 sm:justify-start">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{email}</span>
              </div>

              <div className="mt-1 flex items-center justify-center gap-2 text-indigo-100 sm:justify-start">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm">Joined {formatJoinedDate(createdAt)}</span>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-indigo-50 sm:justify-start">
                <Sparkles className="h-4 w-4" />
                Welcome back, {fullName?.split(" ")[0]}. Ready to keep learning?
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- Statistics Section ---------------- */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Purchased Courses</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {purchasedCourses.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Account Type</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {admin ? "Admin" : "Student"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Member Since</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {formatShortDate(createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------------- Account Information ---------------- */}
        <Card className="mt-6 rounded-3xl border-0 shadow-sm shadow-slate-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <User className="h-5 w-5 text-indigo-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Full Name
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-900">
                    {fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="mt-0.5 break-all text-sm font-medium text-slate-900">
                    {email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    User ID
                  </p>
                  <p className="mt-0.5 break-all text-sm font-medium text-slate-900">
                    {_id}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Role
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-900">
                    {admin ? "Administrator" : "Student"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------- Purchased Courses ---------------- */}
        {/* <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Purchased Courses
            </h2>
            {hasCourses && (
              <span className="text-sm text-slate-500">
                {purchasedCourses.length}{" "}
                {purchasedCourses.length === 1 ? "course" : "courses"}
              </span>
            )}
          </div>

          {hasCourses ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {purchasedCourses.map((courseId, index) => (
                <Card
                  key={courseId}
                  className="group overflow-hidden rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex h-32 w-full items-center justify-center bg-gradient-to-br ${getGradientForId(
                      courseId
                    )}`}
                  >
                    <BookOpen className="h-10 w-10 text-white/90" />
                  </div>
                  <CardContent className="p-5">
                    <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-400">
                      Course
                    </p>
                    <h3 className="mt-1 truncate text-base font-semibold text-slate-900">
                      Course #{String(courseId).slice(-6)}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Enrolled course
                    </p>
                    <Button
                      className="mt-4 w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => navigate(`/YourCourse/${courseId}`)}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-3xl border-0 shadow-sm shadow-slate-200/60">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-500">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Courses Purchased Yet
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Explore our catalog and start learning something new today.
                  </p>
                </div>
                <Button
                  className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate("/")}
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </div> */}

        {/* ---------------- Admin Section ---------------- */}
        {admin === true && (
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Admin Tools
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card
                className="group cursor-pointer rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate("/admin/dashboard")}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Dashboard</p>
                    <p className="text-xs text-slate-500">View analytics</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group cursor-pointer rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate("/admin/courses/create")}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <PlusCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Create Course</p>
                    <p className="text-xs text-slate-500">Add new content</p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group cursor-pointer rounded-2xl border-0 shadow-sm shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-lg"
                onClick={() => navigate("/admin/courses")}
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Manage Courses</p>
                    <p className="text-xs text-slate-500">Edit & organize</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ---------------- Account Actions ---------------- */}
        <Card className="mt-6 mb-10 rounded-3xl border-0 shadow-sm shadow-slate-200/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              disabled
              className="gap-2 rounded-xl"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>

            <Button
              variant="destructive"
              className="gap-2 rounded-xl"
              disabled={isLoggingOut}
              onClick={() => logout()}
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}