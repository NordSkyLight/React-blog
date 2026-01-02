import './AddBlogPost.css';

export const AddBlogPost = () => {
    

    return (
        <>
            <form className='addPostForm'>
            <h2>Создание поста</h2>
            <div>
                <input placeholder='Название поста' type="text" />
            </div>
            <div>
                <textarea placeholder='Текст' name="" id=""></textarea>
            </div>
            <div>
                <button>Создать пост</button>
            </div>
            </form>
            <div className='overlay'></div>
        </>
        
    );
};