/* || JAY SHREE MATAJI || || JAY SHREE GANESH || || JAY SHREE MATAJI || 
|| JAY SHREE RAM || || JAY SHREE KRISHNA ||
|| JAY SHREE KHETARPAL DADA || || JAY SHREE KSHETRAPAL DADA || */

import logo from './logo.svg';
import './App.css';
import SignUp from './Signup';
import img from "./authy-svgrepo-com.svg"

function App() {

  const list = [0,1,2,3,4,5,6,7,8,9,10,11]

  //   return (<>

  //     <div className='loginDiv'>

  //       <div>
  //         <img src={img}></img>
  //       </div>

  //       <form>

  //         <div className="header">
  //           signup
  //         </div>

  //         <div>

  //           <label>
  //             name
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <div>

  //           <label>
  //             email
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <div>

  //           <label>
  //             password
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <div>

  //           <label>
  //             confirm password
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <button>
  //           SignUp
  //         </button>

  //       </form>
  // {/*       
  //       <form>

  //         <div className="header">
  //           Login
  //         </div>

  //         <div>

  //           <label>
  //             email
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <div>

  //           <label>
  //             password
  //           </label>

  //           <input type="text"></input>

  //         </div>

  //         <button>
  //           Login
  //         </button>

  //       </form> */}

  //     </div>

  //   </>);


  return (<>

    <header>

      <div className="logo">

        TeamCollab

      </div>

      <div className="links">

        <ul type="none">
          <li>
            <i class="fa fa-home" aria-hidden="true"></i> Home
          </li>
          <li>
            <i class="fa fa-dashcube" aria-hidden="true"></i> Dashbord
          </li>
        </ul>

      </div>

      <div className="profile">

        <ul type="none">
          <li>
            notification
          </li>
          <li>
            <i class="fa fa-user" aria-hidden="true"></i> profile
          </li>
        </ul>

      </div>

    </header>

    <div className="mainContainer">

      <div className="createTeamPOPUP" id='createMemberPOPUP'>

        <form>

          <div className="header">
            Create Member
          </div>

          <div>

            <label>
              name
            </label>

            <input type="text"></input>

          </div>

          <div>

            <label>
              email
            </label>

            <input type="text"></input>

          </div>

          <div>

            <label>
              profession
            </label>

            <input type="text"></input>

          </div>

          <button>
            Create
          </button>

          <span className='popup-disp' id="popup-disp">
            <label onClick={() => {
              document.getElementById("createMemberPOPUP").style.display = "none";
            }}>
              <i class="fa fa-close" aria-hidden="true"></i>
            </label>
          </span>

        </form>

      </div>

      <div className="createTeamPOPUP" id='createTeamPOPUP'>

        <form>

          <div className="header">
            Create Team
          </div>

          <div>

            <label>
              name
            </label>

            <input type="text"></input>

          </div>

          <div>

            <label>
              description
            </label>

            <textarea></textarea>

          </div>

          <button>
            Create
          </button>

          <span className='popup-disp' id="popup-disp">
            <label onClick={() => {
              document.getElementById("createTeamPOPUP").style.display = "none";
            }}>
              <i class="fa fa-close" aria-hidden="true"></i>
            </label>
          </span>

        </form>

      </div>

      <div className="createTaskPOPUP" id='createTaskPOPUP' style={{
        display: "none"
      }}>

        <form>

          <div className="header">
            Create Task
          </div>

          <div>

            <label>
              Task Title
            </label>

            <input type="text"></input>

          </div>

          <div className="header" style={{
            height: "10px"
          }}>
            start Time & date
          </div>

          <div className='shortWidth'>
            <input type='date'></input>
          </div>

          <div className='shortWidth'>
            <input type='time'></input>
          </div>

          <div className="header" style={{
            height: "10px"
          }}>
            Due Time & date
          </div>

          <div className='shortWidth'>
            <input type='date'></input>
          </div>

          <div className='shortWidth'>
            <input type='time'></input>
          </div>

        </form>

        <form>

          <div>

            <label>
              description
            </label>

            <textarea></textarea>

          </div>

          <button>
            create task
          </button>

        </form>

        <form>

          <div>

            <label>
              member
            </label>

            <select>
              <option>
                member1
              </option>
            </select>

          </div>

          <div className='uploadedData'>

            <label>
              <i class="fa fa-close" aria-hidden="true"></i> member1
            </label>

            <label>
              <i class="fa fa-close" aria-hidden="true"></i> member1
            </label>

            <label>
              <i class="fa fa-close" aria-hidden="true"></i> member1
            </label>

          </div>

          <span className='popup-disp' id="popup-disp">
            <label onClick={() => {
              document.getElementById("createTaskPOPUP").style.display = "none";
            }}>
              <i class="fa fa-close" aria-hidden="true"></i>
            </label>
          </span>

        </form>

      </div>








      <div className="componentContainer componentContainerHome">

        <div>

          <div className="head-label">
            <i class="fa fa-info" aria-hidden="true"></i> Created Teams
          </div>

          <div className='buttons'>
            <button onClick={() => {
              document.getElementById("createTeamPOPUP").style.display = "flex";
            }}>
              <i class="fa fa-plus" aria-hidden="true"></i> create Team
            </button>
          </div>

          <div className="homeTeamList">

            {
              list.map((value, counter) => {

                return (<>

                  <div className="card" style={{
                    position:"relative"
                  }}>

                    <div>
                      <i class="fa fa-bookmark" aria-hidden="true"></i>
                    </div>

                    <div>

                      <label>
                        heading
                      </label>

                      <label>
                        description of heading
                      </label>

                    </div>

                    <span className='more' onClick={() => {
                      document.getElementById("popupTeam-disp" + counter.toString()).style.display = "flex";
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>

                    <span className='popup-disp' id={"popupTeam-disp" + counter.toString()} style={{
                      background: "#fa4169",
                      flexDirection: "row-reverse",
                      right:"2px",
                      top:"2px"
                    }}>
                      <span onClick={() => {
                        document.getElementById("popupTeam-disp" + counter.toString()).style.display = "none";
                      }}>
                        <i class="fa fa-close" aria-hidden="true"></i>
                      </span>
                      <span>
                        <i class="fa fa-trash" aria-hidden="true"></i> Delete
                      </span>
                      <span>
                        <i class="fa fa-pencil" aria-hidden="true"></i> Update
                      </span>
                    </span>

                  </div>

                </>)

              })
            }

          </div>

          <div className="head-label" style={{
            marginTop: "40px",
          }}>
            <i class="fa fa-info" aria-hidden="true"></i> Tasks
          </div>

          <div className='buttons'>
            <button onClick={() => {
              document.getElementById("createTaskPOPUP").style.display = "flex";
            }}>
              <i class="fa fa-plus" aria-hidden="true"></i> create Task
            </button>
          </div>

          <div className="homeTaskList">

            {
              list.map((value, counter) => {
                return (<>

                  <div className="card">

                    <div>
                      task Title
                    </div>

                    <div>

                      <label>
                        description of Task nsldnlsadnvlwsndvlwnsdvsn  dvln s
                        sdn vklsvlsfvnslfnvsfcvs dfvnsjfv
                      </label>

                    </div>

                    <div className="members">

                      <label>
                        members
                      </label>

                      <div>
                        <label>member1</label>
                        <label>member1</label>
                        <label>member1</label>
                        <label>member1</label>
                        <label>member1</label>
                        <label>member1</label>
                        <label>member1</label>
                      </div>

                    </div>

                    <div>

                      <label>
                        assing on: 12/12/2024, 12:00
                      </label>

                      <label>
                        due on: 15/12/2024, 12:00
                      </label>

                    </div>

                    <span className='more' onClick={() => {
                      document.getElementById("popupTask-disp" + counter.toString()).style.display = "flex";
                    }}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>

                    <span className='popup-disp' id={"popupTask-disp" + counter.toString()}>

                      <span style={{
                        pointer: "cursor",
                      }} onClick={() => {
                        document.getElementById("popupTask-disp" + counter.toString()).style.display = "none";
                      }}>
                        <i class="fa fa-close" aria-hidden="true"></i>
                      </span>

                      <span>
                        <i class="fa fa-trash" aria-hidden="true"></i> Delete
                      </span>

                      <span>
                        <i class="fa fa-pencil" aria-hidden="true"></i> Update
                      </span>

                    </span>

                  </div>

                </>)
              })
            }

          </div>

        </div>

        <div className="Members">

          <div className="header">

            <label>
              teamName
            </label>

            <div onClick={() => {
              document.getElementById("createMemberPOPUP").style.display = "flex";
            }}>

              <label>
                add member
              </label>

              <i class="fa fa-plus" aria-hidden="true"></i>

            </div>

          </div>

          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>

          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div><div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>
          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>


          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>


          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>


          <div className="card">

            <div>
              k
            </div>

            <div>

              <label>
                heading
              </label>

            </div>

          </div>

        </div>

      </div>

    </div >

  </>);

}

export default App;
