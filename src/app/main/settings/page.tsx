"use client";

import NameComponents from "@/app/_components/NameComponents";

import { useEffect, useState } from "react";
import { fetchUser, updateSetting } from "./action";
import { userProfile } from "@/app";
import { SubmitHandler, useForm } from "react-hook-form";

export type FormValue = {
  stopAnonQuestion: boolean;
  stopNewQuestion: boolean;
  questionBoxName: string;
};

export default function Settings() {
  const [userInfo, setUserInfo] = useState<userProfile | null>();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = async (e) => {
    if (userInfo) {
      updateSetting(userInfo?.handle, e);
      setButtonClicked(true);
      setTimeout(() => {
        setButtonClicked(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUser().then((r) => setUserInfo(r));
  }, []);

  return (
    <div className="w-full glass grid grid-cols-2 gap-4 rounded-box shadow p-2">
      <div className="flex ml-4 gap-2 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2">
            {userInfo?.avatarUrl !== undefined && (
              <img
                src={userInfo?.avatarUrl}
                alt="User Avatar"
                className="rounded-full"
              />
            )}
          </div>
        </div>
        <div className="ml-2">
          <span className="text-xl font-thin">안녕하세요,</span>
          <div className="flex text-2xl items-center">
            <NameComponents username={userInfo?.name} width={32} height={32} />
            님!
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl mb-4">우리만의 비밀설정창</span>
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-thin text-xl">익명 질문을 받지 않기</span>
            <span className="font-thin text-xl">더 이상 질문을 받지 않기</span>
            <span className="font-thin text-xl">질문함 이름 (10글자 이내)</span>
          </div>
          <div>
            {userInfo ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <input
                  {...register("stopAnonQuestion")}
                  type="checkbox"
                  className="toggle toggle-success"
                  defaultChecked={userInfo.stopAnonQuestion}
                />
                <input
                  {...register("stopNewQuestion")}
                  type="checkbox"
                  className="toggle toggle-success"
                  defaultChecked={userInfo.stopNewQuestion}
                />
                <input
                  {...register("questionBoxName", {
                    maxLength: 10,
                  })}
                  type="text"
                  placeholder={userInfo?.questionBoxName}
                  className={`input input-bordered mr-2 ${
                    errors.questionBoxName?.type === "maxLength" &&
                    "input-error"
                  }`}
                />
                <div className="col-span-2 mr-2 flex justify-end">
                  <button
                    type="submit"
                    className={`btn ${
                      buttonClicked ? "btn-disabled" : "btn-primary"
                    }`}
                  >
                    {buttonClicked ? "저장했어요!" : "저장"}
                  </button>
                </div>
              </form>
            ) : (
              <span className="loading loading-spinner loading-lg" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}