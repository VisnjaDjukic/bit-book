import React, { Component, Fragment } from 'react';
import * as userService from "../../../services/userService"
import "./MyUserProfile.css"
import { UserProfile } from './UserProfile'
import { EditProfile } from './EditProfile';

class MyUserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profile: {},
            // name: "",
            // email: "",
            // aboutShort: "",
            // about: "",
            // avatarUrl: "",
            // userId: null
        }
    };



    componentDidMount() {
        this.loadEditInput()
        this.submitInput()
        const userId = this.props.match.params.id;

        if (userId) {
            this.loadSingleUserProfile(userId);
        } else {
            this.loadProfileData();
        }
    }

    loadProfileData = () => {
        userService.fetchMyProfile()
            .then(myProfile => {
                this.setState({
                    profile: myProfile,
                    userId: myProfile.userId
                })
            })

    }
    componentDidUpdate() {
        this.localStorage()
    }


    localStorage = () => {
        localStorage.setItem('userId', this.state.userId)
    }


    loadSingleUserProfile(userId) {
        userService.fetchSingleUser(userId)
            .then(myUser => {
                this.setState({ profile: myUser })
            })
    }

    submitInput = (profile) => {
        console.log("profile obj pick inside:", profile);

        // const data = { ...profile }
        // const data = {
        //     name: "",
        //     aboutShort: "",
        //     about: "",
        //     avatarUrl: ""
        // }
        userService.editProfile(profile)
            .then((profile) => {
                this.setState({
                    name: profile.name,
                    aboutShort: profile.aboutShort,
                    about: profile.about,
                    avatarUrl: profile.avatarUrl
                })

                this.loadEditInput()
            })
    }

    loadEditInput() {
        userService.editProfile()
            .then(data => {
                console.log(data)
                this.setState({})
            })
    }

    render() {

        if (!this.state.profile) {
            return <h1>Loading...</h1>
        }

        const { name, aboutShort, avatarUrl, postsCount, commentsCount } = this.state.profile;
        return (
            <Fragment>
                <UserProfile
                    name={name}
                    aboutShort={aboutShort}
                    avatarUrl={avatarUrl}
                    postsCount={postsCount}
                    commentsCount={commentsCount}
                />

                <EditProfile profile={this.state.profile} onSubmit={this.submitInput} />
            </Fragment>

        )
    }
}

export { MyUserProfile }
