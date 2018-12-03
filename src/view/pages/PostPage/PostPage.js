import React, { Component } from 'react';

import { CommentList } from './CommentList';
import * as postService from '../../../services/postService';
import { ImagePost } from '../Feed/ImagePost';
import { VideoPost } from '../Feed/VideoPost';
import { TextPost } from '../Feed/TextPost';

class PostPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: null,
            comments: []
        }
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        const { postId, postType } = this.props.match.params;

        postService.fetchSinglePost(postId, postType)
            .then(post => {
                this.setState({
                    post
                })
            })
    }

    renderPost = (post) => {
        if (post.isImage()) {
            return <ImagePost postId={post.id} type={post.type} src={post.imageUrl} />
        } else if (post.isVideo()) {
            return <VideoPost postId={post.id} type={post.type} url={post.videoUrl} />
        } else {
            return <TextPost postId={post.id} type={post.type} text={post.text} />
        }
    }

    render() {
        const { post } = this.state;

        if (!post) {
            return <p>Loading...</p>
        }

        return (
            <div className="container">
                {this.renderPost(post)}
                <CommentList postId={post.id} />
            </div>
        )
    }
}

export { PostPage };
