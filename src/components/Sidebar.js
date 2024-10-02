import Image from 'next/image';
import SwitchButton from './SwitchButton'; // Import the SwitchButton component

function Sidebar({ mode, setMode, showResourceLink, setShowResourceLink, showProposedPrompt, setShowProposedPrompt, darkMode, setDarkMode }) {
  const modes = [
    { 
      name: 'creative', 
      label: 'Accident Mode',
      description: 'Use for reporting accident in the factory'
    },
    { 
      name: 'balanced', 
      label: 'Productivity mode',
      description: 'Integrate with OCR and AI to improve productivity like generating report, auto scan checksheet, etc.'
    },
    { 
      name: 'strict', 
      label: 'Training mode',
      description: '"Training mode" is fine-tuned to help train the new employee whenever they have any questions about how to do their job.'
    }
  ];

  return (
    <aside className="w-[482px] bg-white border-r-[1px] border-[#03B473] flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto scrollbar-hide p-8">
        <h1 className="text-2xl font-bold text-blue-600">Main</h1>
        <h2 className="text-xl font-semibold mt-6 mb-4 text-blue-600">Mode</h2>
        <ul className="space-y-6">
          {modes.map((modeOption) => (
            <li key={modeOption.name} className="bg-white rounded-lg shadow-md p-6">
              <label className="flex items-start cursor-pointer">
                <Image
                  src={mode === modeOption.name ? "/checked.png" : "/unchecked.png"}
                  width={24}
                  height={24}
                  alt="radio"
                  className="mt-1 mr-4"
                  onClick={() => setMode(modeOption.name)}
                />
                <div>
                  <span className="font-semibold text-blue-600 text-lg">{modeOption.label}</span>
                  <p className="text-sm text-gray-600 mt-2">{modeOption.description}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <select className="w-full p-3 border rounded text-blue-600 text-lg">
            <option>Select AI Engine</option>
          </select>
        </div>
        <div className="mt-6 space-y-4">
          <label className="flex items-center cursor-pointer">
            <Image
              src={showResourceLink ? "/checked.png" : "/unchecked.png"}
              width={24}
              height={24}
              alt="checkbox"
              className="mr-3"
              onClick={() => setShowResourceLink(!showResourceLink)}
            />
            <span className="text-blue-600 text-lg">Show resource-link</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <Image
              src={showProposedPrompt ? "/checked.png" : "/unchecked.png"}
              width={24}
              height={24}
              alt="checkbox"
              className="mr-3"
              onClick={() => setShowProposedPrompt(!showProposedPrompt)}
            />
            <span className="text-blue-600 text-lg">Show proposed prompt</span>
          </label>
        </div>
        <label className="mt-6 flex items-center cursor-pointer">
          <Image
            src={darkMode ? "/checked.png" : "/unchecked.png"}
            width={24}
            height={24}
            alt="checkbox"
            className="mr-3"
            onClick={() => setDarkMode(!darkMode)}
          />
          <span className="text-blue-600 text-lg">Dark mode</span>
        </label>
      </div>
      <div className="p-4 flex justify-center items-center border-t border-gray-200">
        <SwitchButton />
      </div>
    </aside>
  );
}

export default Sidebar;