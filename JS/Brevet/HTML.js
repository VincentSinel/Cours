
class HtmlManipulator
{
    static LoadOK = false;
    static Gdocument;

    static SetupExerciceBrevet(folder, file){
        let url = new URL("ExerciceBrevet.html", document.location.href);
        url.searchParams.append('folder', folder);
        url.searchParams.append('file', file);
        window.open(url, '_blank');
        window.focus();
    }

    static GetFile(){
        let params = (new URL(document.location)).searchParams;
        return params.get('file');
    }

    static GetFolder(){
        let params = (new URL(document.location)).searchParams;
        return params.get('folder');
    }


    
}