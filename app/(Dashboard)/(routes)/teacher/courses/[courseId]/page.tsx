import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { IconBadge } from "@/components/Iconbadge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/TitleForm";

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId, //check if the course is created by the user
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length; //total number of fields
  const completedFields = requiredFields.filter(Boolean).length; //number of fields that are not empty

  const completionText = `( ${completedFields} / ${totalFields} )`;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* completion Text */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm
           initialData={course}
           courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
