import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddExp from './AddExp';
import axiosInstance from '../util/axiosConfig';
import ExpCard from './ExpCard';
import { toast } from 'react-toastify';

const initialState = {
    firstname: '',
    lastname: '',
    bio: '',
    phone_number: '',
    linkedin_profile: '',
    past_experiences: []

};

export default function EditProfile() {
    const pram = useParams();
    const id = pram?.id
    const [profile, setprofile] = useState(initialState);
    const [index, setIndex] = useState(-1);

    const onChange = (e) =>
        setprofile({ ...profile, [e.target.name]: e.target.value });

    window.onload = async function () {
        console.log("request send")

        if (!id) return;
        await axiosInstance.get('/admin/user/' + id, {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        })
            .then(res => {
                console.log("get data back");
                console.log(res.data);
                setprofile(res.data)
                // return res;
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })



    };

    const success = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const error = (err) => toast.error(err, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const submitForm = (e) => {

        e.preventDefault()
        submitData()
        // /user/update/:id


    }

    const submitData = async (msg) => {
        let url = '/admin/user/update/' + id
        axiosInstance.post(url, profile, {
            headers: {
                "Authorization": `Bearer ${(localStorage.getItem('wizegridAdminToken') !== null) ? JSON.parse(localStorage.getItem('wizegridAdminToken')) : null}`
            }
        })
            .then(res => {
                console.log(res);
                success(msg || "Data Submitted")

            })
            .catch(err => {
                error(err)
                alert()
                console.dir(err);
            })
    }


    function deleteExp(i) {
        profile?.past_experiences.splice(i, 1)
        submitData('Exp Deleted')
        window.location.reload()


    }



    return (
        <div className="profile-top">

            <div className="profile-about">
                <img className="round-img my-1" src='https://avatars.githubusercontent.com/u/68281476?s=40&v=4' alt="" />
                <h1 className="large">{profile?.firstname + " " + profile?.lastname}</h1>
                {
                    profile?.past_experiences?.map((exp, i) => {
                        console.log(i);
                        return <ExpCard deletecard={deleteExp} exp={exp} idx={i} />
                    })
                }
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="bio"> Bio </label>

                        <input type="text" name="bio" placeholder='bio'
                            value={profile?.bio}
                            onChange={onChange}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="linkedin_profile"> Linkedin Profile</label>
                        <input type="text" name="linkedin_profile" placeholder='linkedin profile'
                            value={profile?.linkedin_profile}
                            onChange={onChange}


                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input type="text" name="phone_number" placeholder="phone_number"
                            value={profile?.phone_number}
                            onChange={onChange}

                        />
                    </div>

                    <AddExp exp={profile?.past_experiences} addDataToBackend={submitData} idx={index} />

                    <input
                        type="Submit"
                        onClick={submitForm}
                        className="btn btn-primary bg_primary_special  my-1"
                    />

                </form>

            </div>
        </div>





    )
}
