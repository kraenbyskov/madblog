import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { client } from './client';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"


const CardImage = styled.div`
width:100%;
height:200px;
background-image:url(${props => props.Image});
background-position:center;
background-size:cover;
`

const Tags = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:50%;
`

const Tag = styled.span`
background:lightgray;
padding:8px 20px;
border-radius:5px;
`


const Content = ({ data }) => {
    const { title, tags, description, longDescription, courseImage, nutritionPerServings, ingredients } = data.fields
    console.log(ingredients)
    return (
        <div>
            <CardImage Image={courseImage && courseImage.fields.file.url} />
            <h1>{title}</h1>

            <section dangerouslySetInnerHTML={{ __html: documentToHtmlString(description) }} />
            <section dangerouslySetInnerHTML={{ __html: documentToHtmlString(longDescription) }} />

            <Tags>
                {tags.map((tags) => (
                    <Tag>{tags}</Tag>
                ))}
            </Tags>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map((ingredients) => (
                    <li>{ingredients}</li>
                ))}
            </ul>

            <h3>Nutrition per servings</h3>
            <ul>
                {nutritionPerServings.map((nutrition) => (
                    <li>{nutrition}</li>
                ))}
            </ul>



        </div>
    )
}


export default function SinglePage() {
    let { id } = useParams()
    const [state, setstate] = useState()

    useEffect(() => {
        client.getEntry(id)
            .then((response) => {
                setstate(response)
            })
            .catch(console.error)
    }, [id])
    return (
        <>
            {state &&
                <Content data={state} />
            }
        </>
    )
}
