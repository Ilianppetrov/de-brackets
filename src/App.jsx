import { useEffect, useRef, useState } from "react";
import "./App.css";
import $ from "jquery";
import timepicker from "./timepicker";

import "./brackets";
// import "jquery-bracket/src/jquery.bracket.js";
// import "jquery-bracket/dist/jquery.bracket.min.js";
import "jquery-bracket/dist/jquery.bracket.min.css";

import renderer from "./panAndZoom";
import full32Teams from "./full32Teams";

const eightTeamsCompleted = {
  teams: [
    ["Team 1", "Team 2"],
    ["Team 3", "Team 4"],
    ["Team 5", "Team 6"],
    ["Team 7", "Team 8"],
  ],
  results: [
    [
      [
        [9, 4],
        [4, 9],
        [3, 9],
        [9, 4],
      ],
      [
        [9, 4],
        [4, 9],
      ],
      [[9, 4]],
    ],
    [
      [
        [4, 9],
        [2, 9],
      ],
      [
        [9, 2],
        [9, 2],
      ],
      [[4, 9]],
      [[9, 4]],
    ],
    [
      [
        [9, 4],
        [4, 9],
      ],
    ],
  ],
};

const fourTeams = {
  teams: [
    ["Team 1", "Team 2"],
    ["Team 3", "Team 4"],
  ],
  results: [
    [
      [
        [null, null],
        [null, null],
      ],
    ],

    [[[null, null]]],

    [[[null, null]]],
  ],
};

const twTeams = {
  teams: [
    ["Team 1", "Team 2"],
    ["Team 3", "Team 4"],
    ["Team 5", "Team 6"],
    ["Team 7", "Team 8"],
    ["Team 9", "Team 10"],
    ["Team 11", "Team 12"],
    ["Team 13", "Team 14"],
    ["Team 15", "Team 16"],
    ["Team 17", "Team 18"],
    ["Team 19", "Team 20"],
    ["Team 21", "Team 22"],
    ["Team 23", "Team 24"],
    ["Team 25", "Team 26"],
    ["Team 27", "Team 28"],
    ["Team 29", "Team 30"],
    ["Team 31", "Team 32"],
  ],
  results: [
    [
      [
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
      ],
    ],
    [
      [
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
        [null, null],
      ],
    ],
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const containerRef = useRef();
  const bracketRef = useRef();

  useEffect(() => {
    timepicker("timepicker");
  }, []);

  useEffect(() => {
    /* Called whenever bracket is modified
     *
     * data:     changed bracket object in format given to init
     * userData: optional data given when bracket is created.
     */
    function saveFn(data, userData) {
      console.log(data, userData);
    }

    var container = $("#brackets");
    container.bracket({
      init: fourTeams,
      save: saveFn,
      disableToolbar: true,
      disableTeamEdit: true,
      teamWidth: 200,
      scoreWidth: 40,
      matchMargin: 80,
      roundMargin: 50,
      centerConnectors: true,
    });

    /* You can also inquiry the current data */
    var data = container.bracket("data");

    console.log("data", data);
  }, []);

  useEffect(() => {
    let isActive = false;

    const activate = () => (isActive = true);
    const deactivate = () => (isActive = false);

    const container = containerRef.current;
    const brackets = bracketRef.current;

    const instance = renderer({
      scaleSensitivity: 15,
      minScale: 0.1,
      maxScale: 30,
      element: brackets,
    });

    const wheelEvent = (event) => {
      event.preventDefault();
      instance.zoom({
        deltaScale: Math.sign(event.deltaY) > 0 ? -1 : 1,
        x: event.pageX,
        y: event.pageY,
      });
    };

    const mouseEvent = (event) => {
      if (!isActive) return;
      event.preventDefault();
      instance.panBy({
        originX: event.movementX,
        originY: event.movementY,
      });
    };

    container.addEventListener("wheel", wheelEvent);
    container.addEventListener("mousemove", mouseEvent);
    container.addEventListener("mousedown", activate);
    container.addEventListener("mouseup", deactivate);

    return () => {
      container.removeEventListener("wheel", wheelEvent);
      container.removeEventListener("mousemove", mouseEvent);
      container.removeEventListener("mousedown", activate);
      container.removeEventListener("mouseup", deactivate);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div id="brackets" className="brackets" ref={bracketRef}>
        App
      </div>
    </div>
  );
}

export default App;
