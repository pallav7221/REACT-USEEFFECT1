import React from "react";

export const Todo = () => {
    const [inputValue, setInputValue] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [todos, setTodos] = React.useState([]);

    const getTodos = () => {
        setLoading(true);
        fetch(`http://localhost:3001/todos`)
            .then((res) => res.json())
            .then((res) =>{ setTodos(res)})
            .catch(err=>{
                setError(true);
                setTodos([]);
            }).finally(()=>{
                setLoading(false)
            });
    }

    React.useEffect(() => {
        getTodos();
    }, [])
    const AddTodo = () => {
        const payload = {
            title: inputValue,
            status: false,
        }
        setLoading(true);
        fetch(`http://localhost:3001/todos`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json",
            }
        }).then((res) =>

            res.json()
        ).then((res) => {
            setError(false);
            return getTodos()
        })
            .catch((err) => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            })

    }
    return loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (<div>
        <h1>Todo app using JSON Server</h1>
        <input type="text" placeholder="Add todo" value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }} />
        <button onClick={AddTodo}>Add Into Todo</button>
        <br />
        {
            todos.map((todo) => (
                <h1 key={todo.id} >{todo.title}</h1>
            ))
        }
    </div>
    )
}