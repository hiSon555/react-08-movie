import { useNavigate } from "react-router";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Button = styled.button`
padding: 12px;
background-color: #ff5959;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
`;

function SearchBar({ keyword }) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    const onChangeHandler = e => setInput(e.target.value);

    const onSubmitHandler = e => {
        e.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Input onChange={onChangeHandler} value={input} />
            <Button>Search</Button>
        </Form>
    );
}

export default SearchBar;
