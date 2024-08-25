function formatDate(date) {
    // Create an array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Create an array of suffixes for day numbers
    const suffixes = ["th", "st", "nd", "rd"];

    // Helper function to get the suffix for a day number
    function getDaySuffix(day) {
        const modulo10 = day % 10;
        const modulo100 = day % 100;
        if (modulo10 === 1 && modulo100 !== 11) return suffixes[1];
        if (modulo10 === 2 && modulo100 !== 12) return suffixes[2];
        if (modulo10 === 3 && modulo100 !== 13) return suffixes[3];
        return suffixes[0];
    }

    // Convert the input to a Date object
    const d = new Date(date);
    
    // Get the day, month, and year
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    // Return the formatted date string
    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
}

export default formatDate;

