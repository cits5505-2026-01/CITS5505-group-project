$(document).ready(function () {
    var DEFAULT_PROFILE_PIC = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80';

    // Demo data for this page only.
    // TODO: Replace with data returned by backend API.
    var profile = {
        id: 'u1',
        nickname: 'Alice Li',
        profilePic: DEFAULT_PROFILE_PIC,
        intro: 'I enjoy teaching frontend and exchanging language learning experiences.',
        offerSkills: ['HTML', 'CSS', 'JavaScript'],
        learnSkills: ['Public Speaking', 'Photography']
    };

    var isEditMode = false;
    var pendingProfilePicDataUrl = '';

    // Avoid XSS
    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Normalize text by trimming and collapsing whitespace. Return empty string for null/undefined.
    function normalizeText(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return String(value).trim().replace(/\s+/g, ' ');
    }

    // Cache page elements.
    var $profilePic = $('#profile-pic');
    var $nickname = $('#profile-nickname');
    var $intro = $('#profile-intro');
    var $viewBadge = $('#profile-view-badge');
    var $authTip = $('#profile-auth-tip');

    var $editBtn = $('#profile-edit-btn');
    var $saveBtn = $('#profile-save-btn');
    var $cancelBtn = $('#profile-cancel-btn');
    var $editForm = $('#profile-edit-form');

    var $editNickname = $('#edit-nickname');
    var $editProfilePicFile = $('#edit-profile-pic-file');
    var $editProfilePicTrigger = $('#edit-profile-pic-trigger');
    var $editProfilePicName = $('#edit-profile-pic-name');
    var $editIntro = $('#edit-intro');

    var $offerSkills = $('#offer-skills');
    var $learnSkills = $('#learn-skills');
    var $offerSkillEditor = $('#offer-skill-editor');
    var $learnSkillEditor = $('#learn-skill-editor');
    var $offerSkillInput = $('#offer-skill-input');
    var $learnSkillInput = $('#learn-skill-input');

    //Skill list
    function renderSkillList($container, skills, type) {
        var html = '';
        var i = 0;
        
        if (!skills || skills.length === 0) {
            $container.html('<span class="skill-chip-empty">No skills added yet.</span>');
            return;
        }

        for (i = 0; i < skills.length; i++) {
            var safeSkill = escapeHtml(skills[i]);
            html += '<span class="skill-chip"><span>' + safeSkill + '</span>';
            // Show remove button in edit mode only.
            if (isEditMode) {
                html += '<button type="button" class="remove-skill" data-type="' + type + '" data-skill="' + safeSkill + '">×</button>';
            }

            html += '</span>';
        }

        $container.html(html);
    }

    // Render profile data to page.
    function renderProfile() {
        var currentProfilePic = profile.profilePic || DEFAULT_PROFILE_PIC;
        if (isEditMode && pendingProfilePicDataUrl) {
            currentProfilePic = pendingProfilePicDataUrl;
        }

        $profilePic.attr('src', currentProfilePic);
        $nickname.text(profile.nickname || 'Unnamed User');
        $intro.text(profile.intro || 'No introduction provided yet.');

        // Demo mode only: always editable.
        $viewBadge.removeClass('text-bg-secondary').addClass('text-bg-success').text('My Profile');
        if (isEditMode) {
            $editBtn.addClass('d-none');
        } else {
            $editBtn.removeClass('d-none');
        }
        $authTip.addClass('d-none').text('');

        renderSkillList($offerSkills, profile.offerSkills || [], 'offer');
        renderSkillList($learnSkills, profile.learnSkills || [], 'learn');
    }

    // Render profile data in edit mode form.
    function syncFormFromProfile() {
        $editNickname.val(profile.nickname || '');
        $editProfilePicFile.val('');
        $editProfilePicName.text('No file chosen');
        $editIntro.val(profile.intro || '');
    }

    // Toggle edit/view mode.
    function setEditMode(nextEditMode) {
        isEditMode = nextEditMode;

        if (isEditMode) {
            pendingProfilePicDataUrl = '';
            syncFormFromProfile();
            $editForm.removeClass('d-none');
            $saveBtn.removeClass('d-none');
            $cancelBtn.removeClass('d-none');
            $editBtn.addClass('d-none');
            $offerSkillEditor.removeClass('d-none');
            $learnSkillEditor.removeClass('d-none');
        } else {
            pendingProfilePicDataUrl = '';
            $editForm.addClass('d-none');
            $saveBtn.addClass('d-none');
            $cancelBtn.addClass('d-none');
            $editBtn.removeClass('d-none');
            $offerSkillEditor.addClass('d-none');
            $learnSkillEditor.addClass('d-none');
            $editProfilePicFile.val('');
            $editProfilePicName.text('No file chosen');
            $offerSkillInput.val('');
            $learnSkillInput.val('');
        }

        renderProfile();
    }

    // Check if skill already exists in the list (case-insensitive).
    function hasSkill(targetList, normalizedSkill) {
        var i = 0;
        for (i = 0; i < targetList.length; i++) {
            if (String(targetList[i]).toLowerCase() === normalizedSkill.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    // Add skill to the list if it doesn't exist. Type is either 'offer' or 'learn'.
    function addSkill(type, skillInput) {
        var normalizedSkill = normalizeText(skillInput);
        var targetList;

        if (!normalizedSkill) {
            return;
        }

        if (type === 'offer') {
            targetList = profile.offerSkills;
        } else {
            targetList = profile.learnSkills;
        }

        if (hasSkill(targetList, normalizedSkill)) {
            return;
        }

        targetList.push(normalizedSkill);
        renderProfile();
    }

    // Remove skill from the list. Type is either 'offer' or 'learn'.
    function removeSkill(type, skillValue) {
        var targetList;
        var filtered = [];
        var i = 0;

        if (type === 'offer') {
            targetList = profile.offerSkills;
        } else {
            targetList = profile.learnSkills;
        }

        for (i = 0; i < targetList.length; i++) {
            if (String(targetList[i]).toLowerCase() !== String(skillValue).toLowerCase()) {
                filtered.push(targetList[i]);
            }
        }

        if (type === 'offer') {
            profile.offerSkills = filtered;
        } else {
            profile.learnSkills = filtered;
        }

        renderProfile();
    }

    // Button events.
    $editBtn.on('click', function () {
        setEditMode(true);
    });

    $cancelBtn.on('click', function () {
        setEditMode(false);
    });

    $saveBtn.on('click', function () {
        var nickname = normalizeText($editNickname.val());

        if (!nickname) {
            $editNickname.trigger('focus');
            return;
        }

        profile.nickname = nickname;
        if (pendingProfilePicDataUrl) {
            profile.profilePic = pendingProfilePicDataUrl;
        }
        profile.profilePic = profile.profilePic || DEFAULT_PROFILE_PIC;
        profile.intro = normalizeText($editIntro.val()) || 'No introduction provided yet.';

        // TODO: Send profile to backend API here.
        setEditMode(false);
        renderProfile();
    });

    // Use local image file as preview-only avatar before backend upload is available.
    $editProfilePicTrigger.on('click', function () {
        $editProfilePicFile.trigger('click');
    });

    $editProfilePicFile.on('change', function () {
        var file = this.files && this.files[0];
        var reader;

        if (!file) {
            pendingProfilePicDataUrl = '';
            $editProfilePicName.text('No file chosen');
            renderProfile();
            return;
        }

        if (!file.type || file.type.indexOf('image/') !== 0) {
            this.value = '';
            pendingProfilePicDataUrl = '';
            $editProfilePicName.text('No file chosen');
            renderProfile();
            return;
        }

        $editProfilePicName.text(file.name);
        reader = new FileReader();
        reader.onload = function (event) {
            pendingProfilePicDataUrl = String((event.target && event.target.result) || '');
            renderProfile();
        };
        reader.readAsDataURL(file);
    });

    // Add skill button events.
    $('#offer-skill-add').on('click', function () {
        addSkill('offer', $offerSkillInput.val());
        $offerSkillInput.val('');
        $offerSkillInput.trigger('focus');
    });

    $('#learn-skill-add').on('click', function () {
        addSkill('learn', $learnSkillInput.val());
        $learnSkillInput.val('');
        $learnSkillInput.trigger('focus');
    });

    // Press Enter to add skill.
    $offerSkillInput.on('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSkill('offer', $offerSkillInput.val());
            $offerSkillInput.val('');
        }
    });

    $learnSkillInput.on('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSkill('learn', $learnSkillInput.val());
            $learnSkillInput.val('');
        }
    });

    // remove skill button event (using event delegation since these buttons are rendered dynamically).
    $(document)
        .off('click.profileRemoveSkill', '.remove-skill')
        .on('click.profileRemoveSkill', '.remove-skill', function () {
            if (!isEditMode) {
                return;
            }

            var type = $(this).data('type');
            var skill = $(this).data('skill');
            removeSkill(type, skill);
        });

    // First render.
    renderProfile();
    setEditMode(false);
});
