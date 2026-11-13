import { useNavigate } from "react-router";
import { type ChangeEvent, type SubmitEvent, useState } from "react";
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

// Props의 타입을 지정해주기 위한 방법

// 1. 외부 사용처를 중심으로 수정하는 것
// SearchBar라는 컴포넌트는 지금 Home과 Search에서 불러와지고 있는 상황
// => Props에 값을 전달해주는건 Home, Search
// => Home   keyword라는 속성 자체가 없고
// => Search  keyword에 string을 넣고 있다

// Props 타입은 { keyword }: { keyword?: string }

// 2. 내부 코드 진행 상 unput 태그의 값으로 input 이라는 state가 존재하고
//    그러므로 input state는 string 타입이어야 하고
//    그에 대한 초기값인 keyword는 당연히 string 타입이어야 하는구나
//    SearchBar Props 에 대해 2번 방법 ( 내부 고려 )
function SearchBar({ keyword } : { keyword: string }) {
    const navigate = useNavigate();
    const [input, setInput] = useState(keyword);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setInput(e.target.value);

    const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        // input의 타입이 string | undefined로 했기 때문에
        // 그에 대한 내로잉을 해주고 trim()을 해줘야 함
        // 근데 if를 통해 블록 스코프를 나눴으니
        // 밖에서 k 변수를 만들어주고, if 내부에서 덮어쓰기를 해야 함
        // let k;
        // inf (typeof input === "string") {
        //     k = input.trim();
        // }
        // SearchBar Props 에 대해 1번 방법 ( 외부 고려 )
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
