import React, { useState, useEffect } from "react";
import "./App.css";
import { FaBiking, FaRunning, FaWalking } from "react-icons/fa";
import profilePic from "./components/Assets/profil2.PNG";
import { db, collection, getDocs } from "./firebase";
import motivasyon from "./components/Assets/motivasyon.jpg";

function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutData, setWorkoutData] = useState({});
  const [activeExercises, setActiveExercises] = useState([]); // Use an array to track active exercises
  const [activeWarmup, setActiveWarmup] = useState(false);
  const [activeCardio, setActiveCardio] = useState(false);
  const [activeCooldown, setActiveCooldown] = useState(false);
  const toggleSectionActive = (sectionName) => {
    switch (sectionName) {
      case "warmup":
        setActiveWarmup(!activeWarmup);
        break;
      case "cardio":
        setActiveCardio(!activeCardio);
        break;
      case "cooldown":
        setActiveCooldown(!activeCooldown);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const data = {};
      querySnapshot.forEach((doc) => {
        const dayName = doc.id.split("-")[1];
        data[dayName] = doc.data();
      });
      setWorkoutData(data);
    };

    fetchWorkoutData();
  }, []);

  const toggleExerciseActive = (index) => {
    const currentIndex = activeExercises.indexOf(index);
    const newActiveExercises = [...activeExercises];

    if (currentIndex === -1) {
      newActiveExercises.push(index); // Add index if not currently active
    } else {
      newActiveExercises.splice(currentIndex, 1); // Remove index if currently active
    }

    setActiveExercises(newActiveExercises);
  };

  useEffect(() => {
    // Reset active states when a new day is selected
    setActiveExercises([]);
    setActiveWarmup(false);
    setActiveCardio(false);
    setActiveCooldown(false);
  }, [selectedDay]);
  
  const getTurkishDayName = (dayName) => {
    
    if (dayName === " Pazertesi") return "Pazartesi";
    else if (dayName === " Sali") return "Salı";
    else if (dayName === " Carsamba") return "Çarşamba";
    else if (dayName === " Persembe") return "Perşembe";
    else if (dayName === " Cuma") return "Cuma";
    else if (dayName === " Cumartesi") return "Cumartesi";
    else if (dayName === " Pazar") return "Pazar";
    else return dayName; // Return the original name if no match is found
  };

  const renderWorkoutDetails = (day) => {
    const workout = workoutData[day];
    const turkishDayName = getTurkishDayName(day);
    if (!workout) return <p>No workout found for this day.</p>;
    return (
      <div className="workout-details-container">
        <h2>{turkishDayName} Workout</h2>
        {workout.warmup && (
          <div
            onClick={() => toggleSectionActive("warmup")}
            className="cardio-section"
            style={{ backgroundColor: activeWarmup ? "#d4edda" : "" }}
          >
            <h3 className="section-header" style={{ backgroundColor: activeWarmup ? "#d4edda" : "" }}>
              Warm-Up <FaRunning />
            </h3>
            <p className="section-content" style={{ backgroundColor: activeWarmup ? "#d4edda" : "" }}>{workout.warmup}</p>
          </div>
        )}
        <h2>Exercises</h2>
        <div className="workout-details">
          {workout.excercises?.map((exercise, index) => (
            <div
              key={index}
              onClick={() => toggleExerciseActive(index)}
              className="activity-card"
              style={{ backgroundColor: activeExercises.includes(index) ? "#d4edda" : "" }}
            >
              <div className="activity-header">
                <div className="activity-name">{exercise.name}</div>
                <div>{exercise.description}</div>
                <img src={exercise.image} alt={exercise.name} className="exercise-image"/>
                <a href={exercise.video} target="_blank" rel="noopener noreferrer" className="exercise-video-link">
                  Watch Video
                </a>
              </div>
            </div>
          ))}
        </div>
        {workout.cardio && (
          <div
            onClick={() => toggleSectionActive("cardio")}
            className="cardio-section"
            style={{ backgroundColor: activeCardio ? "#d4edda" : "" }}
          >
            <h3 className="section-header" style={{ backgroundColor: activeCardio ? "#d4edda" : "" }}>Cardio</h3>
            <p className="section-content" style={{ backgroundColor: activeCardio ? "#d4edda" : "" }}>{workout.cardio}</p>
          </div>
        )}
        {workout.cooldown && (
          <div
            onClick={() => toggleSectionActive("cooldown")}
            className="cooldown-section"
            style={{ backgroundColor: activeCooldown ? "#d4edda" : "" }}
          >
            <h3 className="section-header" style={{ backgroundColor: activeCooldown ? "#d4edda" : "" }}>Cooldown</h3>
            <p className="section-content" style={{ backgroundColor: activeCooldown ? "#d4edda" : "" }}>{workout.cooldown}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app">
      <div className="header">
        <div className="sidebar">
          <div className="profile-pic">
            <img src={profilePic} alt="Profile" />
          </div>
          <nav>
            <ul>
              {Object.keys(workoutData).map((day) => (
                <li key={day} onClick={() => setSelectedDay(day)}>
                  {getTurkishDayName(day)}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="main-content">
        {selectedDay ? (
          renderWorkoutDetails(selectedDay)
        ) : (
          <div className="welcome">
            <div style={{ width: "70%", marginTop: "100px" }}>
              Antrenman planına hoş geldin! Yukarıdan gününü seç ve hemen başlayalım, hadi bakalım!
            </div>
            <img src={motivasyon} alt="Motivation" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
