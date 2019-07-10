const schema = {
  Plus: {
    live_now_item_card: {
      onclick: {
        name: "Live Now Card Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "list_item",
            key: "author.uid"
          },
          educator_username: {
            context: "list_item",
            key: "author.username"
          }
        }
      },
      onlongclick: {
        name: "Live Now Card Click",
        data: {
          educator_id: {
            context: "list_item",
            key: "author.uid"
          },
          educator_username: {
            context: "list_item",
            key: "author.username"
          }
        }
      }
    },
    live_now_see_all: {
      onclick: {
        name: "Live Now See All Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "list_item",
            key: "author.uid"
          },
          educator_username: {
            context: "list_item",
            key: "author.username"
          },
          type: {
            context: "list_item",
            key: "type"
          }
        }
      }
    },
    continue_watching_see_all: {
      onclick: {
        name: "Continue Watching See All Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "list_item",
            key: "author.uid"
          },
          educator_username: {
            context: "list_item",
            key: "author.username"
          },
          type: {
            context: "list_item",
            key: "type"
          }
        }
      }
    },
    today_courses_see_all: {
      onclick: {
        name: "Today Courses See All",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "list_item",
            key: "author.uid"
          },
          educator_username: {
            context: "list_item",
            key: "author.username"
          },
          type: {
            context: "list_item",
            key: "type"
          }
        }
      }
    },
    educator_item_card: {
      onclick: {
        name: "Educator Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          educator_id: {
            context: "list_item",
            key: "uid"
          },
          educator_username: {
            context: "list_item",
            key: "username"
          },
          educator_name: {
            context: "list_item",
            key: "first_name"
          }
        }
      }
    },
    get_subscription_main: {
      onclick: {
        name: "Plus: Home Get Subscription",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          goal_id: {
            context: "Screen",
            key: "goal.uid"
          },
          goal_name: {
            context: "Screen",
            key: "goal.name"
          }
        }
      }
    },
    refer_a_friend_block: {
      onclick: {
        name: "Plus: Refer a Friend",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          goal_id: {
            context: "Screen",
            key: "goal.uid"
          },
          goal_name: {
            context: "Screen",
            key: "goal.name"
          }
        }
      }
    }
  },
  PlusSubscriptionCourseScreen: {
    lesson_item_card: {
      onclick: {
        name: "Plus Lesson item click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          lesson_id: {
            context: "list_item",
            key: "properties.uid"
          },
          course_id: {
            context: "Screen",
            key: "plus_course_details.uid"
          },
          educator_name: {
            context: "Screen",
            key: "plus_course_details.author.uid"
          }
        }
      }
    }
  },
  PlusEducatorProfile: {
    educator_profile_ongoing_item_card: {
      onclick: {
        name: "Educator Profile Ongoing Card Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "Screen",
            key: "plus_educator_profile.uid"
          },
          educator_name: {
            context: "Screen",
            key: "plus_educator_profile.first_name"
          },
          educator_live_classes: {
            context: "Screen",
            key: "plus_educator_profile.live_classes"
          }
        }
      }
    },
    educator_profile_upcoming_item_card: {
      onclick: {
        name: "Educator Profile Upcoming Card Click",
        data: {
          last_primary_source: {
            context: "Screen",
            key: "last_primary_source"
          },
          course_id: {
            context: "list_item",
            key: "uid"
          },
          is_enrolled: {
            context: "list_item",
            key: "is_enrolled"
          },
          educator_id: {
            context: "Screen",
            key: "plus_educator_profile.uid"
          },
          educator_name: {
            context: "Screen",
            key: "plus_educator_profile.first_name"
          },
          educator_live_classes: {
            context: "Screen",
            key: "plus_educator_profile.live_classes"
          }
        }
      }
    }
  }
};

export default schema;
