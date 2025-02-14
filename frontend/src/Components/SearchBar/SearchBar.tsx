import {useState} from 'react';

function SearchBar() {
  
  const [searchInput, setSearchInput] = useState("");
  const [showMatching, setShowMatching] = useState(false); 

  const people = [
    { firstname: "John", lastname: "Doe" },
    { firstname: "Jane", lastname: "Smith" },
    { firstname: "Michael", lastname: "Johnson" },
    { firstname: "Emily", lastname: "Davis" },
    { firstname: "David", lastname: "Brown" },
    { firstname: "Sarah", lastname: "Wilson" },
    { firstname: "James", lastname: "Taylor" },
    { firstname: "Laura", lastname: "Anderson" },
    { firstname: "Robert", lastname: "Thomas" },
    { firstname: "Emma", lastname: "Jackson" },
    { firstname: "William", lastname: "White" },
    { firstname: "Olivia", lastname: "Harris" },
    { firstname: "Charles", lastname: "Martin" },
    { firstname: "Sophia", lastname: "Thompson" },
    { firstname: "George", lastname: "Garcia" },
    { firstname: "Isabella", lastname: "Martinez" },
    { firstname: "Henry", lastname: "Robinson" },
    { firstname: "Mia", lastname: "Clark" },
    { firstname: "Alexander", lastname: "Lewis" },
    { firstname: "Amelia", lastname: "Lee" }
  ];
  

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }


  const filteredPeople = searchInput.length > 0
    ? people.filter((p) =>
        p.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.lastname.toLowerCase().includes(searchInput.toLowerCase())
      )
    : people;

  return (
    <div>

    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput}
      onFocus={() => setShowMatching(true)}
      onBlur={() => setShowMatching(false)} />

      {showMatching && 
        <li>
          {filteredPeople.map((p) => (
            <ul key={p.firstname} onClick={(e) => setSearchInput(e.target.textContent)}>{p.firstname}{" "}{p.lastname}</ul>
          ))}
        </li>
      }


    </div>
  )

}

export default SearchBar;