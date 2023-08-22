import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool} from '@hookform/devtools'

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const MyForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // const { name, ref, onChange, onBlur } = register("username");
  renderCount++;

  const onSubmit = (data : FormValues)=>{
    console.log('Form Submitted', data);
  }
  return (
    <div>
      <h1>My Form ({renderCount / 2}) </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // name="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate:{
                noAdmin : (fieldValue) => {
                  return (
                    fieldValue !== 'abc@admin.com' || 'Enter  a diffrent email address'
                  )
                },
                notBlackListed: (fieldValue) => {
                  return(
                    !fieldValue.endsWith('baddomain.com') || 'This domain is not supported'
                  )
                }
              }
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

 