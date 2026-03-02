const CompanyLogos = () => {
  const companies = [
       {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
    },
    {
      name: "AMD",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
    },
    {
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg",
    },
  ];

  return (
    <div className="px-4 md:px-[124px] bg-white py-8">
      <div className=" mx-auto px-8 text-center">

        {/* Title */}
        <p className="text-gray-400 text-lg">
          Companies we helped grow
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-between md:gap-20">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.logo}
              alt={company.name}
              className="h-8 md:h-8 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CompanyLogos;