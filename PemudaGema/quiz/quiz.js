document.getElementById('submitBtn').addEventListener('click', function() {
    let score = 0;

    const answers = {
        q1: 'Raja',
        q2: 'tonggak',
        q3: 'pentadbiran',
        q4: 'pembesar',
        q5: 'rakyat',
        q6: 'suci',
        q7: 'Dewa Siva',
        q8: 'Undang-undang',
        q9: 'kesejahteraan',
        q10: 'panduan',
        q11: 'Kutara Manawa',
        q12: 'Wilayah Pengaruh',
        q13: 'memperakui',
        q14: 'Mekong',
        q15: 'Myanmar',
        q16: 'Rakyat',
        q17: 'penduduk',
        q18: 'kesetiaan',
        q19: 'persetiaan',
        q20: 'sumpah'

    };

    Object.keys(answers).forEach(key => {
        const userAnswer = document.getElementById(key).value.trim();
        if (userAnswer.toLowerCase() === answers[key].toLowerCase()) {
            score += 1;
        }
    });

    document.getElementById('score-bar').textContent = 'Score: ' + score;
});