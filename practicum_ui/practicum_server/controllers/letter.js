import Letter from "../models/Letter.js";
import Student from "../models/Student.js";



// Create a letter
export const createLetter = async (req, res) => {
    const { studentId } = req.params;
   
    const { companyName, companyAddress, poBox } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const newLetter = new Letter({
            student: studentId,
            companyName,
            poBox,
            companyAddress,
        });

        await newLetter.save();
        student.letters.push(newLetter._id)
        await student.save()
        console.log(student)
        res.status(201).json(newLetter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


 

// Get all letters
export const getLetters = async (req, res) => {
    try {
        const letters = await Letter.find().populate('student');
        res.status(200).json(letters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all letters for a specific student
export const studentLetters = async (req, res) => {
    const { studentId } = req.params;

    try {
        const letters = await Letter.find({ student: studentId }).populate('student');
        res.status(200).json(letters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific letter by ID
export const getLetterById = async (req, res) => {
    const { id } = req.params;

    try {
        const letter = await Letter.findById(id).populate('student');
        if (!letter) {
            return res.status(404).json({ message: "Letter not found" });
        }
        res.status(200).json(letter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a letter
export const deleteLetter = async (req, res) => {
    const { id } = req.params;

    try {
        await Letter.findByIdAndDelete(id);
        res.status(200).json({ message: "Letter deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a letter
// export const approveLetter = async (req, res) => {
//     const {letterContent} = req.body;
//     console.log(letterContent)
//     const { id } = req.params;
//     console.log(id)

//     try {
//         const letter = await Letter.findById(id);
//         console.log('pass')
//         if (!letter) {
//             return res.status(404).json({ message: "Letter not found" });
//         }
        

//         letter.status = "approved";
//         letter.letterContent = letterContent;
//         await letter.save();
       
//         console.log(letter)

//         res.status(200).json({ message: "Letter approved and content saved" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



export const updateLetterContent = async (req, res) => {
    const { letterContent } = req.body;
    const { id } = req.params;

    try {
        // Find the letter by ID
        const letter = await Letter.findById(id);

        if (!letter) {
            return res.status(404).json({ message: "Letter not found" });
        }

        console.log('Letter')

        // Update the letter content
        letter.letterContent = letterContent;

        // Save the updated letter
        await letter.save();
        console.log(letterContent);
        // Respond with a success message
        res.status(200).json(letter);
    } catch (error) {
        // Handle and log errors
        console.error('Error updating letter content:', error);
        res.status(500).json({ message: error.message });
    }
};


export const approveLetter = async (req, res) => {
    const { letterContent } = req.body;
    const { id } = req.params;

    try {
        // Find the letter by ID
        const letter = await Letter.findById(id);

        if (!letter) {
            return res.status(404).json({ message: "Letter not found" });
        }

        // Update the letter's status and content
        letter.status = "approved";
        letter.letterContent = letterContent;

        // Add a footer with the letter ID
        const footer = `
           
        `;
        letter.letterContent += footer;

        // Add a signature image (assuming a placeholder image URL)
        const signature = `
            <img src="path/to/signature.png" alt="Signature" style="width: 150px; height: 50px;">
        `;
        letter.letterContent = letter.letterContent.replace('<p class="signature">.....................</p>', `<p class="signature">${signature}</p>`);

        // Save the updated letter
        await letter.save();

        // Respond with a success message
        res.status(200).json({ message: "Letter approved and content saved" });
    } catch (error) {
        // Handle and log errors
        console.error('Error approving letter:', error);
        res.status(500).json({ message: error.message });
    }
};





export const rejectLetter = async (req, res) => {
    const { letterId } = req.params;
    const { reason } = req.body;

    try {
        const letter = await Letter.findById(letterId);

        if (!letter) {
            return res.status(404).json({ message: 'Letter not found.' });
        }

        letter.status = 'rejected';
        letter.rejectReason = reason;
        await letter.save();

        res.status(200).json({ message: 'Letter rejected successfully.' });
    } catch (error) {
        console.error('Error rejecting letter:', error);
        res.status(500).json({ message: 'Server error. Failed to reject letter.' });
    }
};

// Get rejected letters for a specific student
export const getRejectedLetters = async (req, res) => {
    try {
        console.log('Getting rejected letters');
    const { studentId } = req.params;
        // Find the student and populate rejected letters
        const student = await Student.findById(studentId).populate({
            path: 'letters',
            // match: { status: 'rejected' },
            // select: 'createdAt companyName companyAddress rejectReason' // Select the fields you need
        })
        console.log(student);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student.letters);
    } catch (error) {
        console.error('Error fetching rejected letters:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
