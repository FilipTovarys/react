import OrderButton from "./OrderButton"

function Book(books) {
    return (
        <div>
            <h2>{books.mytitle}</h2>
            <img src={books.myimage} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores hic autem consectetur, ex dignissimos consequuntur ut dolor nihil incidunt quaerat cum ab, quibusdam quos pariatur delectus distinctio eum harum rerum!</p>
            <OrderButton />
        </div>
    )
}

export default Book