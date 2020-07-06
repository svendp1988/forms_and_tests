import React, {useEffect} from "react";
import {useForm} from 'react-hook-form';


function CustomForm() {
    const {formState, handleSubmit, register, errors, setError} = useForm({
        mode: "onBlur",
    });
    const onSubmit = values => console.log(`Values on submit: `, values, `\n formState is touched: `, formState.touched, '\n errors: ', errors);

    // useEffect(() => console.log('Errors: ', errors,
    //                                    'Touched: ', formState.touched));


    // const handleChange = (e) => {
    //     console.log("handling change")
    //     const name = e.target.name;
    //     if (e.target.value.length === 0) {
    //         setError(name, {type: "required", message: "This field is required"});
    //     }
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label> <br/>
            <input
                name="email"
                data-testid="email"
                ref={register({
                    required: "Required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                    }
                })}
            />
            <br/>
            {errors.email && <span role="alert">{errors.email.message} </span>}<br/>

            <label htmlFor="username">username</label> <br/>
            <input
                name="username"
                data-testid="username"
                ref={register({
                    validate: value => value !== "admin" || "Nice try!"
                })}
            />
            {errors.username && <span role="alert"> {errors.username.message} </span>}

            <button className="ui-button" type="submit">Submit</button>
        </form>
    );
}

export default CustomForm;

