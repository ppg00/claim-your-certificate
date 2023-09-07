import { useState, useRef, useCallback, useEffect } from "react";
import { toPng } from 'html-to-image'; //html-to-image library 
import image from "./image.jpg"



function App() {

  // Add some style(box-shadow) to form onClick on input
  let input = useRef(null)
  useEffect(() => {
    input.current.addEventListener("focus", () => {
        document.querySelector("form").classList.add("active");
    })

    input.current.addEventListener("blur", () => {
        document.querySelector("form").classList.remove("active");
    })
  }, [])
  

    // Prevent refresh page after submit the form
    const submit = (e) => {
      e.preventDefault();
      onButtonClick()
    };
  
    const [name, setNeme] = useState({
      studentName: ""
    });
  

  function handelChange(e) {
    const { name, value } = e.target;
    setNeme((prevName) => ({
      ...prevName,
      [name]: value,
    }));

  }
  //  Download Certificate image
  const capture = useRef(null)
  const onButtonClick = useCallback(() => {
    
    // Check if empty input & user claim his certificate before
    const ccb = localStorage.getItem("claim-certificate-before");
    if (input.current.value == null || input.current.value === "") {
      alert("Please insert your full name.")
      return

    } else if (capture.current === null || ccb === "true") {
      alert("You have already claimed your certificate.")
      return
    }

    // Hide <form> after submit
    capture.current.style.filter = "none"
    document.querySelector("form").style.display = "none"
    document.querySelector("p").style.display = "none"

    // Add user to localStorage
    // localStorage.setItem("claim-certificate-before", "true");

    // html-to-image function
    toPng(capture.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'certificate.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [capture])





  return (
    <main>

      <div className="certificate-container" ref={capture}>
        <img src={image} alt="certificate" />
        <div className="name-text">{name.studentName}</div>
      </div>


      <form onSubmit={submit}>
        <input dir="auto" onChange={handelChange} ref={input} name="studentName" value={name.studentName} type="text" placeholder='Enter your full name' />
        <button type="submit" title="Claim your certificate">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-download"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"></path>
          <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z"></path>
            </svg>
        </button>
      </form>

      <p dir="auto">تأكد من ادخال الاسم بشكل صحيح, لن تتمكن من المطالبة بالشهادة مرة أخرى.</p>

    </main>
  );
}

export default App;
