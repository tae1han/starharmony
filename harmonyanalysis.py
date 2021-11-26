def harmonyanalysis(lib):
    chorddata = []
    for i in range(len(lib)):
        name = lib[i][0]
        ints = lib[i][1]
        pitches = [0]
        currentnote = 0
        complexity = 0

        for j in range(len(ints)):
            #get pitch class set
            pitches.append(currentnote + ints[j])
            currentnote = currentnote + ints[j]

            #compute harmonic complexity as sum of distance from major triad
            if ints[j] == 0 or ints[j] == 4 or ints[j] == 7:
                complexity += 0
            elif ints[j] == 1 or ints[j] == 3 or ints[j] == 5 or ints[j] == 6 or ints[j] == 8 or ints[j] == 11:
                complexity += 1
            elif ints[j] == 2 or ints[j] == 9 or ints[j] == 10:
                complexity += 2

        #what is the basic triad type of the chord?
        basic = ''
        if name.startswith('maj'):
            basic = 'major'
        elif name.startswith('min'):
            basic = 'minor'
        elif name.startswith('dim') or name.startswith('o'):
            basic = 'diminished'
        elif name.startswith('aug') or name.startswith('+'):
            basic = 'augmented'
        elif name.startswith('sus'):
            basic = 'suspended'
        elif name.startswith('7') or name.startswith('9') or name.startswith('13'):
            basic = 'dominant'
        else:
            basic = 'none'

        #can the chord function as tonic/stable? 0 = yes 1 = no
        if basic == 'major' or basic == 'minor':
            tense = 0
        elif basic == 'suspended' or basic == 'augmented':
            tense = 1
        elif basic == 'dominant' or basic == 'diminished':
            tense = 2

        #how much are the chordtones altered?
        alter = 0
        for char in name:
          if char == 'b' or char == '#' or char == '(':
            alter += 1

        chorddata.append([name,pitches,basic,complexity,tense,alter])

    return chorddata
