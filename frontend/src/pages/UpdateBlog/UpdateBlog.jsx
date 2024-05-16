import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./UpdateBlog.module.css";
import { useSelector } from "react-redux";
import { updateBlog, getBlogById } from "../../api/internal";

function UpdateBlog(){

    const navigate = useNavigate();

    const params = useParams();
    const blogId = params.id;

    const author = useSelector(state => state.user._id);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        async function getblogDetails(){
            const response = await getBlogById(blogId);
            if(response.status === 200){
                setTitle(response.data.blog.title)
                setContent(response.data.blog.content)
                setPhoto(response.data.blog.photo)
            }
        }
        getblogDetails();
    }, [])

    const updateHandler = async () => {
        let data; 
        if(photo.includes('http')){
            data = {
                author, 
                title, 
                content, 
                blogId
            };
        }
        else{
            data = {
                author, 
                title, 
                content,
                photo, 
                blogId
            };
        }

        const response = await updateBlog(data);
        if(response.status === 200){
            navigate('/');
        }
    }

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Update blog!</div>
            <TextInput
                type="text"
                name="title"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{width: '60%'}}
            />
            <textarea
                name="content"
                className={styles.content}
                placeholder="your content goes here..."
                maxLength={400}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className={styles.photoPrompt}>
                <p>Choose a photo</p>
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept='image/jpg, image/jpeg, image/png'
                    onChange={getPhoto}
                />
                <img src={photo} width={150} height={150} />
            </div>
            <button 
                className={styles.update} 
                onClick={updateHandler}
            >
                Update
            </button>
        </div>
    )
}
export default UpdateBlog;