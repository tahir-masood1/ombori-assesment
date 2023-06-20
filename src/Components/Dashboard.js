/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loadingImage from '../Assets/Images/editor-1s-47px.gif';
import './dashboard.css';
import { UserService } from '../Services/UserServices';
import CONSTANTS_DASHBOARD from '../Helpers/Contants';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pageNo, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pageNo === 1) {
      setLoading(true);
      setTimeout(async () => {
        // eslint-disable-next-line no-use-before-define
        fetchData();
        setLoading(false);
      }, 3000);
    }

    // eslint-disable-next-line no-use-before-define
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop)
      !== document.documentElement.offsetHeight
      || isFetching
    ) return;
    setIsFetching(true);
  };

  const fetchData = async () => {
    setTimeout(async () => {
      const result = await UserService.getUsers(pageNo);
      if (result) {
        console.table(result);
        setPage(pageNo + 1);
        const { data } = result;
        setUsers(() => [...users, ...data]);
        if (data?.length === 0) {
          toast.success(CONSTANTS_DASHBOARD.EMPTY_USERS_LIST_TXT, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isFetching) return;
    // eslint-disable-next-line no-use-before-define
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div className="content">
      {loading && pageNo === 1 && <img src={loadingImage} alt="loading" className="loading" />}
      {users?.length > 0
          && users.map((user) => (
            <div className="card" key={user.id}>
              <div className="container">
                <img src={user.avatar} alt="Avatar" className="avatar-img" />

                <h4 className="name-tag">
                  <b>{`${user.first_name} ${user.last_name}`}</b>
                </h4>
              </div>
            </div>
          ))}
      {isFetching && (
      <div className="card">
        <h1>{CONSTANTS_DASHBOARD.FETCHING_MORE_USERS_TXT}</h1>
      </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
