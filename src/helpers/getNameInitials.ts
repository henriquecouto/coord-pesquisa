const getNameInitials = (fullName: string = "") => {
  const subNames = fullName.split(" ");

  if (subNames.length > 1) {
    return (subNames[0][0] + subNames[subNames.length - 1][0]).toUpperCase();
  }

  return (subNames[0][0] + subNames[0][1]).toUpperCase();
};

export default getNameInitials;
