$(document).ready(function(){
	$("#student").hover(
	  function () {
		$("#studentdown").css("display", "block");
	  },
	  function () {
		$("#studentdown").css("display", "none");
	  }
	);
	$("#studentdown").hover(
	  function () {
		$("#studentdown").css("display", "block");
	  },
	  function () {
		$("#studentdown").css("display", "none");
	  }
	);

	$("#teacher").hover(
	  function () {
		$("#teacherdown").css("display", "block");
	  },
	  function () {
		$("#teacherdown").css("display", "none");
	  }
	);
	$("#teacherdown").hover(
	  function () {
		$("#teacherdown").css("display", "block");
	  },
	  function () {
		$("#teacherdown").css("display", "none");
	  }
	);


	$(".dropdown li").click(function(){
		$("#intro").fadeTo(300, 0, function(){
			$("#intro").empty();
			$("#home").fadeTo(300, 0, function(){
				$("#home").remove();
			});
		});
		$("#teacherdown").css("display", "none");
		$("#studentdown").css("display", "none");
	});


	$("#student4, #teacher5").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'mvn.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#student3, #teacher4").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'digital.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#teacher1").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'teacher.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#teacher2").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'lesson.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#teacher3").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'presentation.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#teacher6").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'resources.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#student5").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'assignments.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#student2").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'phonics.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

	$("#student1").click(function(){
		$("#cover").css("display", "block");
		$("#cover").fadeTo(500, 1, function(){
			$('#flash').flash(
				{
					swf: 'student.swf',
					height: 560,
					width: 965,
					bgcolor: '#000000'
				}
			);
			$("#cover").fadeTo(500, 0, function(){$("#cover").css("display", "none");});
		});
	});

});