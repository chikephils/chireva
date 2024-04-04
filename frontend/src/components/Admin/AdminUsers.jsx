import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  selectAllUsers,
  selectAllUsersLoading,
  deleteUser,
} from "../../features/admin/adminSlice";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const AdminUsers = () => {
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectAllUsersLoading);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteUser(id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 150,
      flex: 0.8,
      sortable: false,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "joinedAt",
      flex: 0.4,
      minWidth: 100,
      headerName: "joinedAt",
      type: "text",
      sortable: false,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
        joinedAt: user.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="h-full pb-20">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <HiOutlineUserGroup size={24} /> USERS
        </h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center  h-[60vh] ">
          <Loader />
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          autoPageSize
          disableColumnMenu
        />
      )}

      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] md:w-[70%] lg:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h3 className="text-[20px] lg:text-[25px] text-center py-3 lg:py-5 font-Poppins text-[#000000cb]">
              Are you sure you want to delete this user?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setOpen(false)}
              >
                cancel
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => setOpen(false) || handleDelete(userId)}
              >
                confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
