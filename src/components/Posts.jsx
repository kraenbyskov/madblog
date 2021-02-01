import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";


const Card = styled.div`
height:300px;
background:#e0e0e0;
margin:5px;
h3 {
    text-align:center;
    
}

`
const CardsGroup = styled.div`
width:100%;
display:grid;
grid-template-columns:25% 25% 25% 25%;
`

const CardImage = styled.div`
width:100%;
height:200px;
background-image:url(${props => props.Image});
background-position:center;
background-size:cover;
`

const Post = ({ article }) => {
    console.log(article)
    const { title, courseImage } = article.fields
    return (
        <Card>
            <Link to={`/Posts/${article && article.sys.id}`}>
                <CardImage Image={courseImage && courseImage.fields.file.url} />
                <div style={{ backgroundImage: `url(${courseImage && courseImage.fields.file.url})` }} />
            </Link>
            <h3>{title}</h3>
        </Card>
    )
}



export default function Posts({ data }) {
    return (
        <CardsGroup>
            {data && data.items.map((article, index) => (
                <Post key={index} article={article} />
            ))}
        </CardsGroup>
    )
}
