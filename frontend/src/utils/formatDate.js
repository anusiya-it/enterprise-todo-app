/**
 * Industrial Date Formatter
 * Converts Supabase timestamptz to a human-readable format.
 */
export const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "Pending...";

    const options = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    
    return date.toLocaleDateString(undefined, options);
};