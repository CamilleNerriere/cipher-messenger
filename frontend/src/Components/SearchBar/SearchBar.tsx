import './SearchBar.scss'
import {useState, useEffect, useCallback, useRef, KeyboardEvent } from 'react';

interface Person {
  firstname: string;
  lastname: string;
}

function SearchBar() {
  
  const [searchInput, setSearchInput] = useState<string>("");
  const [showMatching, setShowMatching] = useState<boolean>(false); 
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const setItemRef = useCallback((el: HTMLLIElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);


  const people: Person[] = [
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
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setShowMatching(true);
  }

  const handleItemClick = (person: Person): void => {
    setSearchInput(`${person.firstname} ${person.lastname}`);
    setShowMatching(false);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!showMatching) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredPeople.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;

      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < filteredPeople.length) {
          handleItemClick(filteredPeople[selectedIndex]);
        }
        break;

      case 'Escape':
        setShowMatching(false);
        break;
    }
  }


  const filteredPeople = searchInput.length > 0
    ? people.filter((p) =>
        p.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.lastname.toLowerCase().includes(searchInput.toLowerCase())
      )
    : people;

    useEffect(() => {
      setSelectedIndex(-1);
      itemRefs.current = new Array(filteredPeople.length).fill(null);
    }, [searchInput]);

    useEffect(() => {
      if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }, [selectedIndex]);

  return (
    <div className='search'>
    <input
      type="search"
      placeholder="Rechercher"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={searchInput}
      onFocus={() => setShowMatching(true)}
      onBlur={() => setTimeout(() => setShowMatching(false), 200)} />

      {showMatching && 
        <ul className='search__results' ref={listRef}>
          {filteredPeople.map((person, index) => (
            <li 
            key={person.firstname} 
            ref={(el) => setItemRef(el, index)}
            onClick={() => handleItemClick(person)}
            className={index === selectedIndex ? 'selected' : ''}
            onMouseEnter={() => setSelectedIndex(index)}
            >{person.firstname}{" "}{person.lastname}</li>
          ))}
        </ul>
      }


    </div>
  )

}

export default SearchBar;