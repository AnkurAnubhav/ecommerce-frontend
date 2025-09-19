import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        loginId: "",
        password: "",
        confirmPassword: ""
    }); 

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.loginId.trim()) newErrors.loginId = "Login ID is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password";

        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
        }

        // Password strength (basic)
        if (formData.password && formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        }

        // Password match
        if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if(errors[name]){
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //validate form
    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    setLoading(true);
    setMessage("");
    setErrors({});

    try{
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                loginId: formData.loginId,
                password: formData.password
            })
        });

        if(response.ok){
            const result = await response.text();
            setMessage("Registration successful! Please login.");

             setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else{
            const errorText = await response.text();
            setMessage(errorText || "Registration failed. Please try again.");
        }
    } catch(error){
        console.error('Registration error:', error);
        setMessage("Network error. Please try again.");
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Register</h1>
      <p>Please enter the information below to register!</p>
      
      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px',
          backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
          color: message.includes('successful') ? '#155724' : '#721c24',
          border: '1px solid',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
            <label>
                First Name:
                <input type="text" 
                        name="firstName"
                        value={formData.firstName} 
                        onChange={handleChange}
                        disabled={loading} 
                />
                {errors.firstName && <span style={{color: 'red'}}>{errors.firstName}</span>}
            </label>
        </div>
        <div>
          <label>
            Last Name:
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName} 
              onChange={handleChange}
              disabled={loading}
            />
            {errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
          </label>
        </div>
        <div>
          <label>
            Email:
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
          </label>
        </div>
        <div>
          <label>
            Login ID:
            <input 
              type="text" 
              name="loginId"
              value={formData.loginId} 
              onChange={handleChange}
              disabled={loading}
            />
            {errors.loginId && <span style={{color: 'red'}}>{errors.loginId}</span>}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              disabled={loading}
            />
            {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange}
              disabled={loading}
            />
            {errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

    </div>
  );
}

export default Register;